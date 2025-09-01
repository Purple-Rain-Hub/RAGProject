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
  const [attempts, setAttempts] = useState(0);

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
      setAttempts(prev => prev + 1);
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

  const getDistanceColor = (ranking: number) => {
    if (ranking === 0) return "text-green-600 font-bold";
    if (ranking <= 5) return "text-yellow-600";
    if (ranking <= 15) return "text-orange-600";
    return "text-red-600";
  };

  const getDistanceMessage = (ranking: number) => {
    if (ranking === 0) return "🎉 HAI INDOVINATO IL CAMPIONE MISTERIOSO! 🎉";
    if (ranking <= 5) return "Molto vicino! Continua così!";
    if (ranking <= 15) return "Abbastanza vicino, prova ancora!";
    return "Lontano dal campione misterioso, riprova!";
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header with themed styling */}
      <div className="relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        <div className="relative z-10 p-8">
          {/* Game Title */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent float-animation">
              🏆 Campione Misterioso 🏆
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Indovina il campione nascosto! Ogni tentativo ti rivelerà quanto sei vicino alla risposta corretta, 
              ma dovrai usare le tue conoscenze sui campioni di League of Legends per scoprire chi si nasconde nell'ombra.
            </p>
          </div>

          {/* Game Stats */}
          <div className="flex justify-center mb-8">
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-yellow-500/30">
              <div className="text-center">
                <p className="text-yellow-400 font-semibold">Tentativi: <span className="text-white">{attempts}</span></p>
                <p className="text-gray-400 text-sm">Tentativi illimitati</p>
              </div>
            </div>
          </div>

          {/* Game Interface */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30 shadow-2xl">
              <label htmlFor="target" className="block text-lg font-semibold text-blue-300 mb-3">
                💫 Inserisci il nome del campione:
              </label>
              <div className="relative">
                <input
                  id="target"
                  type="text"
                  value={targetInput}
                  onChange={(e) => setTargetInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => targetInput && setShowSuggestions(true)}
                  placeholder="Es: Lux, Yasuo, Ahri..."
                  className="w-full rounded-lg border-2 border-blue-500/50 bg-black/50 px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all duration-200"
                  disabled={loadingChampions}
                  autoComplete="off"
                />
                
                {/* Loading indicator for champions */}
                {loadingChampions && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-blue-300">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-300"></div>
                  </div>
                )}

                {/* Champion suggestions dropdown */}
                {showSuggestions && filteredChampions.length > 0 && (
                  <div className="absolute z-20 w-full mt-2 bg-black/90 backdrop-blur-sm border border-blue-500/50 rounded-lg shadow-2xl max-h-60 overflow-y-auto">
                    {filteredChampions.map((champion, index) => (
                      <div
                        key={index}
                        className="px-4 py-3 hover:bg-blue-500/20 cursor-pointer border-b border-blue-500/20 last:border-b-0 transition-colors duration-150"
                        onClick={() => handleChampionSelect(champion)}
                      >
                        <span className="text-white">{champion}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Invalid champion warning */}
                {targetInput && !champions.includes(targetInput) && !showSuggestions && (
                  <div className="mt-2 text-sm text-red-400 flex items-center">
                    <span className="mr-2">⚠️</span>
                    Campione non trovato. Inserisci un nome valido.
                  </div>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || loadingChampions || !champions.includes(targetInput)}
                className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    Analizzando...
                  </div>
                ) : (
                  "🔍 Analizza Campione"
                )}
              </button>
            </div>

            {/* Results Section */}
            {loading && (
              <div className="mt-6 bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mr-3"></div>
                  <h3 className="text-lg font-semibold text-blue-300">Analizzando il campione...</h3>
                </div>
                <p className="text-gray-400 text-center mt-2">Calcolando la distanza dal campione misterioso...</p>
              </div>
            )}
            
            {result && (
              <div className="mt-6 bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-yellow-500/30">
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
            )}
            
            {error && (
              <div className="mt-6 bg-red-900/40 backdrop-blur-sm rounded-lg p-6 border border-red-500/30">
                <h3 className="text-lg font-semibold text-red-400 mb-2 flex items-center">
                  <span className="mr-2">❌</span>
                  Errore
                </h3>
                <p className="text-red-300">{error}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-12 text-gray-400">
            <p className="text-sm">
              💡 Suggerimento: Usa le informazioni sui campioni come razza, sesso, tipo di danno, 
              ruolo e regione per indovinare il campione misterioso!
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
