import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";

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

async function lolChampsEmb() {
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
    const storageContext = await storageContextFromDefaults({
        persistDir: "./lolChampsEmbeddings",
    });

    // Crea l'indice vettoriale con gli embeddings
    const index = await VectorStoreIndex.fromDocuments(documents, {
        storageContext,
    });
    
    console.log("Indice vettoriale salvato in ./lolChampsEmbeddings")
    
    return index;
}

lolChampsEmb().catch(console.error);