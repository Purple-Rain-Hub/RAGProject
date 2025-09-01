"use client";

import { useState } from "react";

export default function Page() {
  const [targetInput, setTargetInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ ranking: number, queryChamp: string, targetChamp: string } | undefined>(undefined);

  
  const handleSubmit = async () => {
    try {
      setLoading(true);
      setResult(undefined);
      setError("");
      const response = await fetch(`/api/rankingAPI?targetInput=${targetInput}`);
      if (!response.ok) {
        throw new Error("Errore nella fetch del ranking");
      }
      const data = await response.json();
      console.log(data);
      setResult(data.ranking);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Errore nel recupero del ranking");
      setLoading(false);
    }
  }

  return (
    <main className="p-8 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-900 mb-4">Hello Next.js with Tailwind!</h1>
      <p className="text-gray-700">Se vedi questo testo stilizzato, Tailwind funziona correttamente.</p>
      <div className="mt-6">
        <label htmlFor="target" className="block text-sm font-medium text-gray-700 mb-1">
          Target
        </label>
        <input
          id="target"
          type="text"
          value={targetInput}
          onChange={(e) => setTargetInput(e.target.value)}
          placeholder="Inserisci il target"
          className="w-full max-w-md rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Ranking
      </button>
      {loading && (
        <div className="mt-4 p-4 rounded-md bg-gray-100 border">
          <h3 className="font-semibold text-gray-800 mb-2">Loading...</h3>
          <p className="text-gray-700">Caricamento del ranking...</p>
        </div>
      )}
      {result && (
        <div className="mt-4 p-4 rounded-md bg-gray-100 border">
          <h3 className="font-semibold text-gray-800 mb-2">Result:</h3>
          <p className="text-gray-700">Distanza {result.targetChamp} dal Campione Misterioso: {result.ranking}</p>
          {result.ranking == 0? <p className="text-gray-700">HAI INDOVINATO IL CAMPIONE MISTERIOSO</p> : <p className="text-gray-700">Il Campione Misterioso non è {result.targetChamp}, riprova!</p>}
        </div>
      )}
      {error && (
        <div className="mt-4 p-4 rounded-md bg-red-100 border">
          <h3 className="font-semibold text-red-800 mb-2">Error:</h3>
          <p className="text-red-700">{error}</p>
        </div>
      )}
    </main>
  )
}
