"use client";

type Result = { ranking: number; targetChamp: string };

type ResultCardProps = {
  result?: Result;
  getDistanceColor: (ranking: number) => string;
  getDistanceMessage: (ranking: number) => string;
};

export default function ResultCard({ result, getDistanceColor, getDistanceMessage }: ResultCardProps) {
  if (!result) return null;
  return (
    <div className="mt-6 bg-black/40 rounded-lg p-6 border border-yellow-500/30">
      <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center">
        <span className="mr-2">🎯</span>
        Risultato del Tentativo
      </h3>
      <div className="space-y-3">
        <p className="text-gray-300">
          <span className="text-blue-300">Campione analizzato:</span>{" "}
          <span className="text-white font-semibold">{result.targetChamp}</span>
        </p>
        <p className="text-gray-300">
          <span className="text-blue-300">Distanza dal misterioso:</span>{" "}
          <span className={`font-bold text-lg ${getDistanceColor(result.ranking)}`}>
            {result.ranking}
          </span>
        </p>
        <div className="mt-4 p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30">
          <p className={`text-center font-semibold ${getDistanceColor(result.ranking)}`}>
            {getDistanceMessage(result.ranking)}
          </p>
        </div>
      </div>
    </div>
  );
}


