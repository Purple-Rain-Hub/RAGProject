import "dotenv/config";
import { gemini, GeminiEmbedding, GEMINI_MODEL } from "@llamaindex/google";
import {
    Settings,
    VectorStoreIndex,
    storageContextFromDefaults,
    type NodeWithScore,
    MetadataMode
} from "llamaindex";
import fs from "fs";
import path from "path";
import { lolChampsEmb } from "./lol-champs-emb";

// Configurazione LLM e modello di embedding
Settings.llm = gemini({
    apiKey: process.env.GOOGLE_API_KEY!,
    model: GEMINI_MODEL.GEMINI_2_0_FLASH,
});
Settings.embedModel = new GeminiEmbedding();

export async function loadIndex() {
    try {
        console.log("Caricando l'indice vettoriale dei campioni di LoL...");

        // Caricare l'indice salvato dal file lol-champs-emb
        const persistDir = "./lolChampsEmbeddings";

        //Controllo che gli embeddings esistano
        const requiredFiles = ["doc_store.json", "index_store.json", "vector_store.json"];
        const missingFiles = requiredFiles.filter(file => !fs.existsSync(path.join(persistDir, file)));

        if (missingFiles.length > 0) {
            console.log(`File mancanti nella cartella ${persistDir}: ${missingFiles.join(", ")}\n`);
            await lolChampsEmb();
            console.log("Embeddings generati\n")
        }

        const storageContext = await storageContextFromDefaults({ persistDir });

        const index = await VectorStoreIndex.init({
            storageContext,
        });

        console.log("Indice caricato con successo!");

        return index

    } catch (error) {
        console.error("Errore durante il caricamento dell'indice:");
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
        const { message, sourceNodes } = await queryEngine.query({ query: queryChamp });

        //console.log(message.content);

        if (!sourceNodes) {
            throw new Error("Errore nel recupero dei sourceNodes");
        }

        //Calcolo il ranking del target dalla query
        let i = 0
        for (const source of sourceNodes) {
            const metadataName = source.node.metadata.name;
            if (metadataName === targetChamp) {
                console.log(`\n Distanza ${targetChamp} da ${queryChamp}: ${i}`);
                break;
            }
            i++
        };
    } catch (error) {
        console.error("Errore durante il ranking della query: ");
        console.error(error);
    }

}

rankingFromQuery("Lux", "LeBlanc").catch(console.error);