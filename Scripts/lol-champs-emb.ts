import "dotenv/config";
import { put } from "@vercel/blob";

import { gemini, GeminiEmbedding, GEMINI_MODEL } from "@llamaindex/google";
import {
  Document,
  MetadataMode,
  type NodeWithScore,
  Settings,
  VectorStoreIndex,
  storageContextFromDefaults,
} from "llamaindex";

import { CHAMPIONS, type Champion } from "./lol-champs";

Settings.llm = gemini({
  apiKey: process.env.GOOGLE_API_KEY!,
  model: GEMINI_MODEL.GEMINI_2_0_FLASH,
});
Settings.embedModel = new GeminiEmbedding();

export async function lolChampsEmb() {
    const documents = CHAMPIONS.map((champion) => {
        const text = `${champion.name} ${champion.gender} ${champion.species} ${champion.releaseYear} ${champion.region} ${champion.primaryRole} ${champion.secondaryRole || ''} ${champion.damageType}`;
        
        return new Document({
            text,
            // Metadata per la ricerca, l'ia non ne farà uso ed embedding
            metadata: {
                name: champion.name,
                title: champion.title,
                gender: champion.gender,
                species: champion.species,
                releaseYear: champion.releaseYear,
                region: champion.region,
                primaryRole: champion.primaryRole,
                secondaryRole: champion.secondaryRole,
                damageType: champion.damageType,
            }
        })
    })

    console.log(`Processando ${documents.length} campioni...`)

    // Crea uno storage context SOLO in memoria (niente salvataggio locale)
    const storageContext = await storageContextFromDefaults({});

    // Crea l'indice vettoriale con gli embeddings
    const index = await VectorStoreIndex.fromDocuments(documents, {
        storageContext,
    });
    
    // Serializza gli store in memoria e carica direttamente su Vercel Blob
    try {
        const token = process.env.BLOB_READ_WRITE_TOKEN;
        if (!token) {
            console.warn("BLOB_READ_WRITE_TOKEN non impostato; impossibile caricare su Vercel Blob.");
        } else {
            const docStoreDict = (storageContext.docStore as any)?.toDict?.(); //il punto permette di chiamare toDict solo se il metodo esiste
            const indexStoreDict = (storageContext.indexStore as any)?.toDict?.();
            //passaggio necessario perché vectorStores puo contenere più vectorStore
            const vectorStore = (storageContext.vectorStores as any)?.text || Object.values(storageContext.vectorStores)[0];
            const vectorStoreDict = (vectorStore as any)?.toDict?.();

            if (!docStoreDict || !indexStoreDict || !vectorStoreDict) {
                console.warn("Impossibile serializzare uno o più store (toDict mancante)." );
            } else {
                const basePath = "lolChampsEmbeddings";
                const uploads = [
                    { name: "doc_store.json", data: JSON.stringify(docStoreDict), contentType: "application/json" },
                    { name: "index_store.json", data: JSON.stringify(indexStoreDict), contentType: "application/json" },
                    { name: "vector_store.json", data: JSON.stringify(vectorStoreDict), contentType: "application/json" },
                ];

                for (const u of uploads) {
                    const { url } = await put(`${basePath}/${u.name}`, u.data, {
                        access: "public",
                        token,
                        contentType: u.contentType,
                        addRandomSuffix: false,
                    });
                    console.log(`Caricato su Blob: ${u.name} -> ${url}`);
                }
                console.log("Upload su Vercel Blob completato (senza salvataggio locale).");
            }
        }
    } catch (error) {
        console.error("Errore durante l'upload su Vercel Blob:", error);
    }

    console.log("Indice vettoriale generato (solo in memoria).")
    
    return index;
}

//lolChampsEmb().catch(console.error);