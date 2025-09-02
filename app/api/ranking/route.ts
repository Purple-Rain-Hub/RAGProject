import { rankingFromQuery } from "../../../Scripts/lol-champs-query";
import { CHAMPIONS } from "../../../Scripts/lol-champs";

const CHAMPION_NAMES = CHAMPIONS.map(champion => champion.name);

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const targetInput = searchParams.get('targetInput');
        
        if (!targetInput) {
            return Response.json({ error: "targetInput parameter is required" }, { status: 400 });
        }
        
        if(!CHAMPION_NAMES.some(c=> c.toLowerCase() === targetInput.toLowerCase())) {
            return Response.json({ error: "Target champion not found" }, { status: 400 });
        }

        // Pick a deterministic "random" champion per day from the available names
        const today = new Date();
        const seedString = `${today.getUTCFullYear()}-${today.getUTCMonth() + 1}-${today.getUTCDate()}`;
        let hash = 0;
        for (let i = 0; i < seedString.length; i++) {
            hash = (hash * 31 + seedString.charCodeAt(i)) >>> 0;
        }
        const dailyIndex = hash % CHAMPION_NAMES.length;
        const dailyQueryChampion = CHAMPION_NAMES[dailyIndex];
        console.log(dailyQueryChampion);
        

        const ranking = await rankingFromQuery(dailyQueryChampion, targetInput);
        if (!ranking) {
            throw new Error("Ranking not found");
        }
        return Response.json({ ranking: ranking });
        
    } catch (error) {
        console.error('API Error:', error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
