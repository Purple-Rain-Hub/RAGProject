import { CHAMPIONS } from "../../../Scripts/lol-champs";

const CHAMPION_NAMES = CHAMPIONS.map(champion => champion.name);

export async function GET() {
    try {
        return Response.json({ 
            champions: CHAMPION_NAMES,
            total: CHAMPION_NAMES.length 
        });
        
    } catch (error) {
        console.error('API Error:', error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
