"use client";

import { useState, useEffect, useMemo } from "react";

export default function Page() {
  const [targetInput, setTargetInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ ranking: number, targetChamp: string } | undefined>(undefined);
  const [champions, setChampions] = useState<string[]>([]);
  const [attempts, setAttempts] = useState<{ ranking: number, targetChamp: string }[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingChampions, setLoadingChampions] = useState(true);
  const [attemptsCounter, setAttemptsCounter] = useState(0);
  const [invalidAttempt, setInvalidAttempt] = useState(false)
  const [victory, setVictory] = useState(false);
  const [highlightedSuggestion, setHighlightedSuggestion] = useState<number>(-1);

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

  const filteredChampions = useMemo(() => {
    if (
      targetInput.trim() === '' ||
      champions.some(c => c.toLowerCase() === targetInput.toLowerCase())
    ) {
      return [];
    }

    return champions.filter(champion =>
      champion.toLowerCase().startsWith(targetInput.toLowerCase()) &&
      !attempts.some(a => a.targetChamp === champion) &&
      result?.targetChamp != champion
    );
  }, [targetInput, champions, attempts, result]);

  // Toggle suggestions visibility based on input and memoized filtered list
  useEffect(() => {
    if (
      targetInput.trim() === '' ||
      champions.some(c => c.toLowerCase() === targetInput.toLowerCase())
    ) {
      setShowSuggestions(false);
      setHighlightedSuggestion(-1);
      return;
    }

    setShowSuggestions(filteredChampions.length > 0);
    setHighlightedSuggestion(-1);
  }, [targetInput, champions, filteredChampions]);

  const handleChampionSelect = (championName: string) => {
    setTargetInput(championName);
    setShowSuggestions(false);
    setHighlightedSuggestion(-1);
  };

  const handleSubmit = async () => {
    if(victory){
      return
    }

    // Validate that the input is a valid champion
    if (!champions.some(c => c.toLowerCase() === targetInput.toLowerCase())) {
      setError("Per favore inserisci un nome di campione valido");
      return;
    }

    if (result?.targetChamp.toLowerCase() === targetInput.toLowerCase() || attempts.some(a => a.targetChamp.toLowerCase() === targetInput.toLowerCase())) {
      setInvalidAttempt(true);
      return
    }

    try {
      setLoading(true);
      setError("");
      setInvalidAttempt(false);

      if (result) {
        setAttempts([result, ...attempts])
      }
      setResult(undefined);

      setAttemptsCounter(prev => prev + 1);
      const response = await fetch(`/api/ranking?targetInput=${encodeURIComponent(targetInput)}`);
      if (!response.ok) {
        throw new Error("Errore nella fetch del ranking");
      }
      const data = await response.json();
      console.log(data);
      setResult(data.ranking);

      if(data.ranking.ranking === 0){
        setVictory(true)
      }

      setTargetInput("");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Errore nel recupero del ranking");
      setLoading(false);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      if (showSuggestions && filteredChampions.length > 0) {
        e.preventDefault();
        setHighlightedSuggestion(prev => {
          const next = prev < filteredChampions.length - 1 ? prev + 1 : 0;
          return next;
        });
      }
      return;
    }

    if (e.key === 'ArrowUp') {
      if (showSuggestions && filteredChampions.length > 0) {
        e.preventDefault();
        setHighlightedSuggestion(prev => {
          const next = prev > 0 ? prev - 1 : filteredChampions.length - 1;
          return next;
        });
      }
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredChampions.length > 0 && showSuggestions) {
        const suggestionToSelect = highlightedSuggestion >= 0 ? highlightedSuggestion : 0;
        handleChampionSelect(filteredChampions[suggestionToSelect]);
      } else {
        handleSubmit();
      }
      return;
    }

    if (e.key === 'Escape') {
      setShowSuggestions(false);
      setHighlightedSuggestion(-1);
      return;
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
      <div className="relative overflow-y-auto min-h-screen">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 min-h-screen flex flex-col justify-center p-4 md:p-8">
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
            <div className="bg-black/30 rounded-lg p-4 border border-yellow-500/30">
              <div className="text-center">
                <p className="text-yellow-400 font-semibold">Tentativi: <span className="text-white">{attemptsCounter}</span></p>
                <p className="text-gray-400 text-sm">Tentativi illimitati</p>
              </div>
            </div>
          </div>

          {/* Game Interface */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-black/40 rounded-lg p-6 border border-blue-500/30 shadow-2xl">
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
                  placeholder="Es: Vex, Yasuo, Ahri..."
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
                  <div className="absolute z-20 w-full mt-2 bg-black/90 border border-blue-500/50 rounded-lg shadow-2xl max-h-60 overflow-y-auto">
                    {filteredChampions.map((champion, suggestionIndex) => (
                      <div
                        key={suggestionIndex}
                        className={`px-4 py-3 cursor-pointer border-b border-blue-500/20 last:border-b-0 transition-colors duration-150 ${suggestionIndex === highlightedSuggestion ? 'bg-blue-500/30' : 'hover:bg-blue-500/20'}`}
                        onClick={() => handleChampionSelect(champion)}
                      >
                        <span className="text-white">{champion}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Invalid champion warning */}
                {targetInput && !champions.some(c => c.toLowerCase() === targetInput.toLowerCase()) && !showSuggestions && (
                  <div className="mt-2 text-sm text-red-400 flex items-center">
                    <span className="mr-2">⚠️</span>
                    Campione non trovato. Inserisci un nome valido.
                  </div>
                )}

                {/* Invalid attempt warning */}
                {invalidAttempt && (
                  <div className="mt-2 text-sm text-red-400 flex items-center">
                    <span className="mr-2">⚠️</span>
                    Hai già provato questo campione.
                  </div>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || loadingChampions || !champions.some(c => c.toLowerCase() === targetInput.toLowerCase()) || victory}
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

            {error && (
              <div className="mt-6 bg-red-900/40 rounded-lg p-6 border border-red-500/30">
                <h3 className="text-lg font-semibold text-red-400 mb-2 flex items-center">
                  <span className="mr-2">❌</span>
                  Errore
                </h3>
                <p className="text-red-300">{error}</p>
              </div>
            )}

            {/* Results Section */}
            {loading && (
              <div className="mt-6 bg-black/40 rounded-lg p-6 border border-blue-500/30">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mr-3"></div>
                  <h3 className="text-lg font-semibold text-blue-300">Analizzando il campione...</h3>
                </div>
                <p className="text-gray-400 text-center mt-2">Calcolando la distanza dal campione misterioso...</p>
              </div>
            )}

            {result && (
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
            )}

            {attempts && attempts.length > 0 && (
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
