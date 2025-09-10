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
import { list } from "@vercel/blob";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
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

async function downloadBlobStoresToDir(): Promise<string | null> {
    try {
        console.log("Controllo la disponibilità dei blob...");
        const { blobs } = await list({ prefix: "lolChampsEmbeddings/" });
        if (!blobs || blobs.length === 0) {
            console.log("Nessun blob trovato con il prefisso 'lolChampsEmbeddings/'");
            return null;
        }

        let docStoreUrl = "";
        let indexStoreUrl = "";
        let vectorStoreUrl = "";

        for (const blob of blobs) {
            const base = path.posix.basename(blob.pathname);
            const withoutExt = base.replace(/\.[^/.]+$/, "");
            if (withoutExt === "doc_store") docStoreUrl = blob.url;
            if (withoutExt === "index_store") indexStoreUrl = blob.url;
            if (withoutExt === "vector_store") vectorStoreUrl = blob.url;
        }

        if (!docStoreUrl || !indexStoreUrl || !vectorStoreUrl) {
            console.log("Blob incompleti - mancano alcuni file necessari:");
            console.log(`- doc_store: ${docStoreUrl ? '✓' : '✗'}`);
            console.log(`- index_store: ${indexStoreUrl ? '✓' : '✗'}`);
            console.log(`- vector_store: ${vectorStoreUrl ? '✓' : '✗'}`);
            return null;
        }

        console.log("Tutti i blob necessari trovati, procedo con il download...");
        const tmpDir = path.join(os.tmpdir(), "lol-index");
        await fs.mkdir(tmpDir, { recursive: true });

        const [docRes, idxRes, vecRes] = await Promise.all([
            fetch(docStoreUrl),
            fetch(indexStoreUrl),
            fetch(vectorStoreUrl),
        ]);
        
        if (!docRes.ok || !idxRes.ok || !vecRes.ok) {
            console.log("Errore durante il download dei blob:");
            console.log(`- doc_store: ${docRes.ok ? '✓' : `✗ (${docRes.status})`}`);
            console.log(`- index_store: ${idxRes.ok ? '✓' : `✗ (${idxRes.status})`}`);
            console.log(`- vector_store: ${vecRes.ok ? '✓' : `✗ (${vecRes.status})`}`);
            return null;
        }

        const [docJson, idxJson, vecJson] = await Promise.all([
            docRes.text(),
            idxRes.text(),
            vecRes.text(),
        ]);

        // Validazione base dei contenuti JSON
        try {
            JSON.parse(docJson);
            JSON.parse(idxJson);
            JSON.parse(vecJson);
        } catch (jsonError) {
            console.log("Errore: i blob scaricati non contengono JSON valido");
            return null;
        }

        await Promise.all([
            fs.writeFile(path.join(tmpDir, "doc_store.json"), docJson, "utf8"),
            fs.writeFile(path.join(tmpDir, "index_store.json"), idxJson, "utf8"),
            fs.writeFile(path.join(tmpDir, "vector_store.json"), vecJson, "utf8"),
        ]);

        console.log("Blob scaricati e salvati correttamente nella directory temporanea");
        return tmpDir;
    } catch (error) {
        console.log("Errore durante il download dei blob:", error);
        return null;
    }
}

export async function loadIndex() {
    try {
        console.log("Carico l'indice dai blob, se disponibile...");
        const persistDir = await downloadBlobStoresToDir();

        if (persistDir) {
            const storageContext = await storageContextFromDefaults({ persistDir });
            const index = await VectorStoreIndex.init({ storageContext });
            console.log("Indice caricato dai blob!");
            return index;
        }

        console.log("Blob non disponibili o incompleti. Ricreo l'indice...");
        const recreated = await lolChampsEmb();
        if (!recreated) throw new Error("Errore nella creazione dell'indice");
        console.log("Indice ricreato!");
        return recreated;
    } catch (error) {
        console.error("Errore durante il caricamento/creazione dell'indice:");
        console.error(error);
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