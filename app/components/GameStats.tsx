"use client";

type GameStatsProps = {
  attemptsCounter: number;
};

export default function GameStats({ attemptsCounter }: GameStatsProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-black/30 rounded-lg p-4 border border-yellow-500/30">
        <div className="text-center">
          <p className="text-yellow-400 font-semibold">Tentativi: <span className="text-white">{attemptsCounter}</span></p>
          <p className="text-gray-400 text-sm">Tentativi illimitati</p>
        </div>
      </div>
    </div>
  );
}


