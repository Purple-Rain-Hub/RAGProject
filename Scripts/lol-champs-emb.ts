import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";

import { gemini, GEMINI_MODEL } from "@llamaindex/google";
import { OpenAIEmbedding } from "@llamaindex/openai";
import {
  Document,
  MetadataMode,
  type NodeWithScore,
  Settings,
  VectorStoreIndex,
  storageContextFromDefaults,
} from "llamaindex";

import { CHAMPIONS, type Champion } from "./lol-champs";
import { put } from "@vercel/blob";

Settings.llm = gemini({
  apiKey: process.env.GOOGLE_API_KEY!,
  model: GEMINI_MODEL.GEMINI_2_0_FLASH,
});
Settings.embedModel = new OpenAIEmbedding({
    apiKey: process.env.OPENAI_API_KEY!,
    model: "text-embedding-3-small",
});

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

    // Crea il storage context per il salvataggio
    const storageContext = await storageContextFromDefaults({});

    // Crea l'indice vettoriale con gli embeddings
    const index = await VectorStoreIndex.fromDocuments(documents, {
        storageContext,
    });


    const [docBlob, indexBlob, vectorBlob] = await Promise.all([
        put("lolChampsEmbeddings/doc_store.json", JSON.stringify(storageContext.docStore), {
            access: "public",
            contentType: "application/json"
        }),
        put("lolChampsEmbeddings/index_store.json", JSON.stringify(storageContext.indexStore), {
            access: "public",
            contentType: "application/json"
        }),
        put("lolChampsEmbeddings/vector_store.json", JSON.stringify(storageContext.vectorStores.TEXT), {
            access: "public",
            contentType: "application/json"
        })
    ]);
    
console.log("BLOOOOB QUIIIIIIIIIIIIIIII ---------------------------");

    console.log(docBlob);
    console.log(indexBlob);
    console.log(vectorBlob);
    
    console.log("Indice vettoriale salvato sul blob di Vercel")
    
    return index;
}

// Esegui lo script se invocato direttamente
lolChampsEmb()
  .then(() => {
    console.log("Completato con successo.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Errore durante l'esecuzione di lolChampsEmb:", error);
    process.exit(1);
  });