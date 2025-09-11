import "dotenv/config";
import { gemini, GEMINI_MODEL } from "@llamaindex/google";
import { OpenAIEmbedding } from "@llamaindex/openai";
import {
    Settings,
    type NodeWithScore,
    MetadataMode,
    VectorStoreIndex,
    storageContextFromDefaults,
} from "llamaindex";
import { PatchedUpstashVectorStore } from "./PatchedUpstashVectorStore";
import { lolChampsEmb } from "./lol-champs-emb";

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
            return index;
        } else {
            console.log("Indice vuoto trovato su Upstash Vector. Ricreo l'indice...");
            await lolChampsEmb();
            console.log("Embeddings creati e salvati su Upstash Vector!");
            
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Ricarica l'indice dal vector store per assicurarsi che sia sincronizzato
            const reloadedIndex = await VectorStoreIndex.fromVectorStore(vectorStore);
            console.log("Indice ricaricato da Upstash Vector!");
            return reloadedIndex;
        }

    } catch (error) {
        console.error("Errore durante il caricamento/creazione dell'indice:");
        throw error;
    }
}

export async function rankingFromQuery(queryChamp: string, targetChamp: string) {
    try {
        //Carico indice attraverso la funzione loadIndex
        const index = await loadIndex();
        if (!index) {
            throw new Error("Index non definito");
        }

        console.log("Calcolo ranking...");

        // Creare il query engine
        const totChamps = 159;
        const queryEngine = index.asQueryEngine({ similarityTopK: totChamps });
        const { sourceNodes } = await queryEngine.query({ query: queryChamp.toLowerCase() });

        //console.log(message.content);

        if (!sourceNodes) {
            throw new Error("Errore nel recupero dei sourceNodes");
        }

        //Calcolo il ranking del target dalla query
        let i = 0
        for (const source of sourceNodes) {
            const metadataName = source.node.metadata.name;

            if (metadataName.toLowerCase() === targetChamp.toLowerCase()) {
                const ranking = {
                    ranking: i,
                    targetChamp: metadataName
                };
                console.log(ranking.ranking);

                return ranking;
            }
            i++
        };

        return undefined;

    } catch (error) {
        console.error("Errore durante il ranking della query: ");
        console.error(error);
    }

}

rankingFromQuery("Lux", "LeBlanc").catch(console.error);