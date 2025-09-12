import { initializeCache } from "../../../Scripts/lol-champs-query";
import { CHAMPIONS } from "../../../Scripts/lol-champs";

const CHAMPION_NAMES = CHAMPIONS.map(champion => champion.name);

export async function POST(request: Request) {
    try {
        // Pick a deterministic "random" champion per day from the available names
        const today = new Date();
        const seedString = `${today.getUTCFullYear()}-${today.getUTCMonth() + 1}-${today.getUTCDate()}`;
        let hash = 0;
        for (let i = 0; i < seedString.length; i++) {
            hash = (hash * 31 + seedString.charCodeAt(i)) >>> 0;
        }
        const dailyIndex = hash % CHAMPION_NAMES.length;
        const dailyQueryChampion = CHAMPION_NAMES[dailyIndex];
        
        console.log("Inizializzazione cache per il campione del giorno:", dailyQueryChampion);
        
        await initializeCache(dailyQueryChampion);
        
        return Response.json({ 
            success: true, 
            message: `Cache inizializzata per ${dailyQueryChampion}`,
            dailyChampion: dailyQueryChampion
        });
        
    } catch (error) {
        console.error('Errore durante l\'inizializzazione della cache:', error);
        return Response.json({ 
            success: false,
            error: "Errore durante l'inizializzazione della cache" 
        }, { status: 500 });
    }
}
