import "dotenv/config";
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
import { PatchedUpstashVectorStore } from "./PatchedUpstashVectorStore";
import { CHAMPIONS, type Champion } from "./lol-champs";

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


   




    const vectorStore = new PatchedUpstashVectorStore({
        endpoint: process.env.UPSTASH_VECTOR_REST_URL!,
        token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
        namespace: "lol-champions",
    });


    // Crea il storage context con Upstash Vector
    const storageContext = await storageContextFromDefaults({ vectorStore });

    // Crea l'indice vettoriale con gli embeddings
    const index = await VectorStoreIndex.fromDocuments(documents, { storageContext });

    console.log("Indice vettoriale creato e salvato su Upstash Vector");

    return index;
}

//lolChampsEmb().catch(console.error);
