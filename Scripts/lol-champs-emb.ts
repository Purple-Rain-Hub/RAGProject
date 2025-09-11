import "dotenv/config";
// no local temp files needed

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
import { SimpleDocumentStore, SimpleIndexStore } from "llamaindex/storage";

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

    // Crea il storage context in memoria (senza persistDir)
    const storageContext = await storageContextFromDefaults({});

    // Crea l'indice vettoriale con gli embeddings
    const index = await VectorStoreIndex.fromDocuments(documents, { storageContext });

    console.log("Indice creato, ora serializzo gli store in memoria...");

    // Serializza gli store in memoria in JSON
    const docStoreJson = JSON.stringify((storageContext.docStore as unknown as SimpleDocumentStore).toDict());
    const indexStoreJson = JSON.stringify((storageContext.indexStore as unknown as SimpleIndexStore).toDict());
    const vectorStores = storageContext.vectorStores as Record<string, any>;
    const firstVectorStore = Object.values(vectorStores)[0] as { toDict: () => unknown };
    const vectorStoreJson = JSON.stringify(firstVectorStore.toDict());

    // Carica i JSON direttamente sul blob di Vercel
    const [docBlob, indexBlob, vectorBlob] = await Promise.all([
        put("lolChampsEmbeddings/doc_store.json", docStoreJson, {
            access: "public",
            contentType: "application/json",
            allowOverwrite: true,
        }),
        put("lolChampsEmbeddings/index_store.json", indexStoreJson, {
            access: "public",
            contentType: "application/json",
            allowOverwrite: true,
        }),
        put("lolChampsEmbeddings/vector_store.json", vectorStoreJson, {
            access: "public",
            contentType: "application/json",
            allowOverwrite: true,
        }),
    ]);

    if(!docBlob || !indexBlob || !vectorBlob){
        return null
    }

    console.log("File caricati sul blob di Vercel:");
    console.log("- doc_store:", docBlob.url);
    console.log("- index_store:", indexBlob.url);
    console.log("- vector_store:", vectorBlob.url);

    console.log("Indice vettoriale salvato sul blob di Vercel");

    return index;
}

lolChampsEmb().catch(console.error);