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

    // Crea l'indice vettoriale con gli embeddings
    const index = await VectorStoreIndex.fromDocuments(documents)
    const indexPath = index.storageContext.indexStore.persist("lolChampsEmbeddings")

    console.log(`Indice salvato in: ${indexPath}`);
  
    const queryEngine = index.asQueryEngine({similarityTopK: 15});
    const { message, sourceNodes } = await queryEngine.query({query: "Lux"});

    console.log(message.content);

    if(sourceNodes){
      sourceNodes.forEach((source: NodeWithScore, index: number)=>{
        console.log(
      `\n${index}: Score: ${source.score} - ${source.node.getContent(MetadataMode.NONE).substring(0, 50)}...\n`,
        );
      });
    }
    
    
    return index;
}

lolChampsEmb().catch(console.error);