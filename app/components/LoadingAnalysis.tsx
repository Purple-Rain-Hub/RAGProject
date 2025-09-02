"use client";

type LoadingAnalysisProps = {
  show: boolean;
};

export default function LoadingAnalysis({ show }: LoadingAnalysisProps) {
  if (!show) return null;
  return (
    <div className="mt-6 bg-black/40 rounded-lg p-6 border border-blue-500/30">
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mr-3"></div>
        <h3 className="text-lg font-semibold text-blue-300">Analizzando il campione...</h3>
      </div>
      <p className="text-gray-400 text-center mt-2">Calcolando la distanza dal campione misterioso...</p>
    </div>
  );
}


