import { UpstashVectorStore } from "@llamaindex/upstash";
import type { BaseNode, Metadata } from "llamaindex";

/**
 * Patch temporanea:
 * intercetta il falso errore "Failed to save chunk"
 * e ritorna un array vuoto [] invece di lanciare
 */
export class PatchedUpstashVectorStore extends UpstashVectorStore {
  async add(embeddingResults: BaseNode<Metadata>[]): Promise<string[]> {
    try {
      return await super.add(embeddingResults);
    } catch (err: any) {
      if (err?.message === "Failed to save chunk") {
        console.warn("⚠️ Ignorato falso errore 'Failed to save chunk' da @llamaindex/upstash");
        return []; // così rispettiamo la firma
      }
      throw err;
    }
  }
}
