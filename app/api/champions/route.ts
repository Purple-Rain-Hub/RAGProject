import { CHAMPIONS } from "../../../Scripts/lol-champs";

export async function GET() {
    try {
        // Return only the names of champions for the frontend
        const championNames = CHAMPIONS.map(champion => champion.name);
        
        return Response.json({ 
            champions: championNames,
            total: championNames.length 
        });
        
    } catch (error) {
        console.error('API Error:', error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
