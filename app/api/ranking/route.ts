import { rankingFromQuery } from "../../../Scripts/lol-champs-query";
import { CHAMPIONS } from "../../../Scripts/lol-champs";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const targetInput = searchParams.get('targetInput');
        
        if (!targetInput) {
            return Response.json({ error: "targetInput parameter is required" }, { status: 400 });
        }
        
        // Get champion names directly from the imported data
        const championNames = CHAMPIONS.map(champion => champion.name);
        
        if(!championNames.includes(targetInput)) {
            return Response.json({ error: "Target champion not found" }, { status: 400 });
        }

        const ranking = await rankingFromQuery("Lux", targetInput);
        if (!ranking) {
            throw new Error("Ranking not found");
        }
        return Response.json({ ranking: ranking });
        
    } catch (error) {
        console.error('API Error:', error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
