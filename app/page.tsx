"use client";

import { useState, useEffect } from "react";

export default function Page() {
  const [targetInput, setTargetInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ ranking: number, queryChamp: string, targetChamp: string } | undefined>(undefined);
  const [champions, setChampions] = useState<string[]>([]);
  const [filteredChampions, setFilteredChampions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingChampions, setLoadingChampions] = useState(true);

  // Load champions on component mount
  useEffect(() => {
    const loadChampions = async () => {
      try {
        const response = await fetch('/api/champions');
        if (!response.ok) {
          throw new Error('Failed to load champions');
        }
        const data = await response.json();
        setChampions(data.champions);
        setLoadingChampions(false);
      } catch (error) {
        console.error('Error loading champions:', error);
        setError('Errore nel caricamento dei campioni');
        setLoadingChampions(false);
      }
    };

    loadChampions();
  }, []);

  // Filter champions based on input
  useEffect(() => {
    if (targetInput.trim() === '') {
      setFilteredChampions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = champions.filter(champion =>
      champion.toLowerCase().startsWith(targetInput.toLowerCase())
    );
    setFilteredChampions(filtered);
    setShowSuggestions(filtered.length > 0);
  }, [targetInput, champions]);

  const handleChampionSelect = (championName: string) => {
    setTargetInput(championName);
    setShowSuggestions(false);
  };

  const handleSubmit = async () => {
    // Validate that the input is a valid champion
    if (!champions.includes(targetInput)) {
      setError("Per favore inserisci un nome di campione valido");
      return;
    }

    try {
      setLoading(true);
      setResult(undefined);
      setError("");
      const response = await fetch(`/api/ranking?targetInput=${encodeURIComponent(targetInput)}`);
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredChampions.length > 0 && showSuggestions) {
        handleChampionSelect(filteredChampions[0]);
      } else {
        handleSubmit();
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <main className="p-8 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-900 mb-4">Hello Next.js with Tailwind!</h1>
      <p className="text-gray-700">Se vedi questo testo stilizzato, Tailwind funziona correttamente.</p>
      
      <div className="mt-6 relative">
        <label htmlFor="target" className="block text-sm font-medium text-gray-700 mb-1">
          Target Champion
        </label>
        <input
          id="target"
          type="text"
          value={targetInput}
          onChange={(e) => setTargetInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => targetInput && setShowSuggestions(true)}
          placeholder="Inserisci il nome del campione..."
          className="w-full max-w-md rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loadingChampions}
          autoComplete="off"
        />
        
        {/* Loading indicator for champions */}
        {loadingChampions && (
          <div className="absolute right-3 top-8 text-sm text-gray-500">
            Caricamento campioni...
          </div>
        )}

        {/* Champion suggestions dropdown */}
        {showSuggestions && filteredChampions.length > 0 && (
          <div className="absolute z-10 w-full max-w-md mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {filteredChampions.map((champion, index) => (
              <div
                key={index}
                className="px-3 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                onClick={() => handleChampionSelect(champion)}
              >
                {champion}
              </div>
            ))}
          </div>
        )}

        {/* Invalid champion warning */}
        {targetInput && !champions.includes(targetInput) && !showSuggestions && (
          <div className="mt-1 text-sm text-red-600">
            Campione non trovato. Inserisci un nome valido.
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading || loadingChampions || !champions.includes(targetInput)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
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
