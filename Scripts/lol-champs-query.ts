import "dotenv/config";
import { gemini, GEMINI_MODEL } from "@llamaindex/google";
import { OpenAIEmbedding } from "@llamaindex/openai";
import {
    Settings,
    type NodeWithScore,
    MetadataMode,
    VectorStoreIndex,
    storageContextFromDefaults,
    Metadata,
} from "llamaindex";
import { PatchedUpstashVectorStore } from "./PatchedUpstashVectorStore";
import { lolChampsEmb } from "./lol-champs-emb";

// Cache per l'indice vettoriale
let cachedIndex: VectorStoreIndex | null = null;
let lastCacheTime = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minuti di cache

// Cache per la similarity della query
let cachedNodes: NodeWithScore<Metadata>[] | null = null;
let cachedQueryChamp: string | null = null;

// Flag per prevenire inizializzazioni multiple
let isInitializingCache = false;

// Configurazione LLM e modello di embedding
Settings.llm = gemini({
    apiKey: process.env.GOOGLE_API_KEY!,
    model: GEMINI_MODEL.GEMINI_2_0_FLASH,
});
Settings.embedModel = new OpenAIEmbedding({
    apiKey: process.env.OPENAI_API_KEY!,
    model: "text-embedding-3-small",
});

export async function loadIndex() {
    const now = Date.now();

    // Se abbiamo un indice cached e non è scaduto, usalo
    if (cachedIndex && (now - lastCacheTime) < CACHE_DURATION) {
        console.log("Usando indice cached - molto più veloce!");
        return cachedIndex;
    }

    try {
        console.log("Carico l'indice da Upstash Vector...");

        // Configura Upstash Vector Store
        const vectorStore = new PatchedUpstashVectorStore({
            endpoint: process.env.UPSTASH_VECTOR_REST_URL!,
            token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
            namespace: "lol-champions",
        });

        // Prova a caricare l'indice esistente
        const index = await VectorStoreIndex.fromVectorStore(vectorStore);

        // Verifica che l'indice contenga effettivamente degli embeddings con una query di test
        const queryEngine = index.asQueryEngine({ similarityTopK: 1 });
        const testResult = await queryEngine.query({ query: "test" });

        if (testResult.sourceNodes && testResult.sourceNodes.length > 0) {
            console.log("Indice caricato da Upstash Vector!");

            // Cache l'indice
            cachedIndex = index;
            lastCacheTime = now;

            return index;
        } else {
            console.log("Indice vuoto trovato su Upstash Vector. Ricreo l'indice...");
            await lolChampsEmb();
            console.log("Embeddings creati e salvati su Upstash Vector!");

            await new Promise(resolve => setTimeout(resolve, 1000));

            // Ricarica l'indice dal vector store per assicurarsi che sia sincronizzato
            const reloadedIndex = await VectorStoreIndex.fromVectorStore(vectorStore);
            console.log("Indice ricaricato da Upstash Vector!");

            // Cache l'indice ricaricato
            cachedIndex = reloadedIndex;
            lastCacheTime = now;

            return reloadedIndex;
        }

    } catch (error) {
        console.error("Errore durante il caricamento/creazione dell'indice:");
        throw error;
    }
}

export async function cacheFromQuery(queryChamp: string) {
    const now = Date.now();

    // Se abbiamo i nodes cached per lo stesso queryChamp e non sono scaduti, fermiamo la funzione
    if (cachedNodes && cachedQueryChamp === queryChamp && (now - lastCacheTime) < CACHE_DURATION) {
        console.log("Usando cache esistente per", queryChamp);
        return;
    }
    
    try {
        //Carico indice attraverso la funzione loadIndex
        const index = await loadIndex();
        if (!index) {
            throw new Error("Index non definito");
        }

        console.log("Calcolo Query per ", queryChamp);

        // Creare il query engine
        const totChamps = 159;
        const queryEngine = index.asQueryEngine({ similarityTopK: totChamps });
        const { sourceNodes } = await queryEngine.query({ query: queryChamp.toLowerCase() });

        if (!sourceNodes) {
            throw new Error("Errore nel recupero dei sourceNodes");
        }

        //cache dei nodi e del query champ
        cachedNodes = sourceNodes;
        cachedQueryChamp = queryChamp;
        lastCacheTime = now;

        console.log("Cache aggiornata");
        console.log(cachedQueryChamp);
        

    } catch (error) {
        console.error("Errore durante la cache della query: ");
        console.error(error);
    }
}

export async function initializeCache(queryChamp: string) {
    // Se già in inizializzazione, aspetta che finisca
    if (isInitializingCache) {
        console.log("Cache già in inizializzazione, aspetto...");
        while (isInitializingCache) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        return;
    }
    
    isInitializingCache = true;
    try {
        console.log("Inizializzazione cache per", queryChamp);
        await cacheFromQuery(queryChamp);
        console.log("Cache inizializzata con successo");
    } catch (error) {
        console.error("Errore durante l'inizializzazione della cache:", error);
        throw error;
    } finally {
        isInitializingCache = false;
    }
}

export async function rankingFromCache(queryChamp: string, targetChamp: string) {
    try {
        // Verifica se la cache è valida per il queryChamp corrente
        if (!cachedNodes || cachedQueryChamp !== queryChamp) {
            console.log("Cache non valida - aggiorno cache...");
            console.log(cachedQueryChamp, queryChamp);
            
            await initializeCache(queryChamp);
        }

        if (!cachedNodes) {
            throw new Error("Errore cache dei nodi non trovata")
        }

        //Calcolo il ranking del target dalla query
        let i = 0
        for (const source of cachedNodes) {
            const metadataName = source.node.metadata.name;

            if (metadataName.toLowerCase() === targetChamp.toLowerCase()) {
                const ranking = {
                    ranking: i,
                    targetChamp: metadataName
                };
                console.log("Ranking trovato:", ranking.ranking, "per", targetChamp);

                return ranking;
            }
            i++
        };

        return undefined;

    } catch (error) {
        console.error("Errore durante il ranking della query: ");
        console.error(error);
        throw error;
    }

}

//rankingFromQuery("Lux", "LeBlanc").catch(console.error);