"use client";

type ErrorAlertProps = {
  error: string;
};

export default function ErrorAlert({ error }: ErrorAlertProps) {
  if (!error) return null;
  return (
    <div className="mt-6 bg-red-900/40 rounded-lg p-6 border border-red-500/30">
      <h3 className="text-lg font-semibold text-red-400 mb-2 flex items-center">
        <span className="mr-2">❌</span>
        Errore
      </h3>
      <p className="text-red-300">{error}</p>
    </div>
  );
}


