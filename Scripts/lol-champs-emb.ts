import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";

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

    // Crea una cartella temporanea per il salvataggio
    const tmpDir = path.join(os.tmpdir(), "lol-embeddings");
    await fs.mkdir(tmpDir, { recursive: true });

    // Crea il storage context con persistDir per salvare in locale
    const storageContext = await storageContextFromDefaults({ persistDir: tmpDir });

    // Crea l'indice vettoriale con gli embeddings
    const index = await VectorStoreIndex.fromDocuments(documents, {
        storageContext,
    });

    console.log("Indice creato, ora salvo i file temporanei...");

    // Leggi i file generati dalla cartella temporanea
    const [docStoreData, indexStoreData, vectorStoreData] = await Promise.all([
        fs.readFile(path.join(tmpDir, "doc_store.json"), "utf8"),
        fs.readFile(path.join(tmpDir, "index_store.json"), "utf8"),
        fs.readFile(path.join(tmpDir, "vector_store.json"), "utf8"),
    ]);

    // Carica i file sul blob di Vercel
    const [docBlob, indexBlob, vectorBlob] = await Promise.all([
        put("lolChampsEmbeddings/doc_store.json", docStoreData, {
            access: "public",
            contentType: "application/json",
            allowOverwrite: true
        }),
        put("lolChampsEmbeddings/index_store.json", indexStoreData, {
            access: "public",
            contentType: "application/json",
            allowOverwrite: true
        }),
        put("lolChampsEmbeddings/vector_store.json", vectorStoreData, {
            access: "public",
            contentType: "application/json",
            allowOverwrite: true
        })
    ]);

    if(!docBlob || !indexBlob || !vectorBlob){
        return null
    }

    console.log("File caricati sul blob di Vercel:");
    console.log("- doc_store:", docBlob.url);
    console.log("- index_store:", indexBlob.url);
    console.log("- vector_store:", vectorBlob.url);

    // Pulisci la cartella temporanea
    await fs.rm(tmpDir, { recursive: true, force: true });

    console.log("Indice vettoriale salvato sul blob di Vercel e cartella temporanea pulita");

    return index;
}