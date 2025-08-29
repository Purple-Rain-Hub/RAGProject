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

async function loadIndexAndQuery() {
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
    
    // Creare il query engine
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
    
  } catch (error) {
    console.error("Errore durante il caricamento dell'indice:");
    console.error(error);
    console.log("\n💡 Assicurati di aver prima eseguito lo script lol-champs-emb.ts per creare l'indice vettoriale.");
    throw error;
  }
}

// Esegui lo script
if (require.main === module) {
  loadIndexAndQuery().catch(console.error);
}

export { loadIndexAndQuery };
