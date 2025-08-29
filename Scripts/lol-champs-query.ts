import "dotenv/config";
import { gemini, GeminiEmbedding, GEMINI_MODEL } from "@llamaindex/google";
import {
    Settings,
    VectorStoreIndex,
    storageContextFromDefaults,
    type NodeWithScore,
    MetadataMode
} from "llamaindex";

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
        const storageContext = await storageContextFromDefaults({
            persistDir: "./lolChampsEmbeddings",
        });

        const index = await VectorStoreIndex.init({
            storageContext,
        });

        console.log("Indice caricato con successo!");

        return index

    } catch (error) {
        console.error("Errore durante il caricamento dell'indice:");
        console.error(error);
        console.log("\n💡 Assicurati di aver prima eseguito lo script lol-champs-emb.ts per creare l'indice vettoriale.");
    }
}

export async function rankingFromQuery() {
    try {
        //Carico indice attraverso la funzione loadIndex
        const index = await loadIndex();
        if (!index) {
            throw new Error("Index non definito");
        }

        // Creare il query engine
        const totChamps = 159;
        const queryChamp = "Lux"
        const queryEngine = index.asQueryEngine({ similarityTopK: totChamps });
        const { message, sourceNodes } = await queryEngine.query({ query: queryChamp });

        //console.log(message.content);

        if (!sourceNodes) {
            throw new Error("Errore nel recupero dei sourceNodes");
        }

        //Calcolo il ranking del target dalla query
        const targetName = "Lissandra"
        let i = 0
        for (const source of sourceNodes) {
            const metadataName = source.node.metadata.name;
            if (metadataName === targetName) {
                console.log(`\n Distanza ${targetName} da ${queryChamp}: ${i}`);
                break;
            }
            i++
        };
    } catch (error) {
        console.error("Errore durante il ranking della query: ");
        console.error(error);
    }

}

rankingFromQuery().catch(console.error);