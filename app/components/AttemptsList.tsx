"use client";

type Attempt = { ranking: number; targetChamp: string };

type AttemptsListProps = {
  attempts: Attempt[];
  getDistanceColor: (ranking: number) => string;
};

export default function AttemptsList({ attempts, getDistanceColor }: AttemptsListProps) {
  if (!attempts || attempts.length === 0) return null;
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-blue-300 mb-3 flex items-center">
        <span className="mr-2">📋</span>
        Tentativi Precedenti
      </h3>
      <div className="space-y-3">
        {attempts.map((attempt, index) => (
          <div key={index} className="bg-black/30 rounded-lg p-4 border border-blue-500/20 hover:border-blue-500/40 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold">{attempt.targetChamp}</span>
              <span className={`text-sm font-bold px-3 py-1 rounded ${getDistanceColor(attempt.ranking)}`}>
                {attempt.ranking}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


