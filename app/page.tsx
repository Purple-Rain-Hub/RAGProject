"use client";

import { useState, useEffect } from "react";
import { useChampionSuggestions } from "./hooks/useChampionSuggestions";
import Header from "./components/Header";
import GameStats from "./components/GameStats";
import ErrorAlert from "./components/ErrorAlert";
import LoadingAnalysis from "./components/LoadingAnalysis";
import ResultCard from "./components/ResultCard";
import AttemptsList from "./components/AttemptsList";
import Footer from "./components/Footer";

export default function Page() {
  const [targetInput, setTargetInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ ranking: number, targetChamp: string } | undefined>(undefined);
  const [champions, setChampions] = useState<string[]>([]);
  const [attempts, setAttempts] = useState<{ ranking: number, targetChamp: string }[]>([])
  const [loadingChampions, setLoadingChampions] = useState(true);
  const [initializingCache, setInitializingCache] = useState(false);
  const [cacheError, setCacheError] = useState("");
  const [attemptsCounter, setAttemptsCounter] = useState(0);
  const [invalidAttempt, setInvalidAttempt] = useState(false)
  const [victory, setVictory] = useState(false);

  //hook per suggerimenti
  const {
    filteredChampions,
    showSuggestions,
    highlightedSuggestion,
    setShowSuggestions,
    setHighlightedSuggestion,
    handleChampionSelect,
    keyDownFunc,
  } = useChampionSuggestions(
    { targetInput, champions, attempts, result },
    setTargetInput
  );

  // Load champions and initialize cache on component mount
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Load champions
        const championsResponse = await fetch('/api/champions');
        if (!championsResponse.ok) {
          throw new Error('Failed to load champions');
        }
        const championsData = await championsResponse.json();
        setChampions(championsData.champions);
        
        // Initialize cache in the background
        setInitializingCache(true);
        setCacheError("");
        try {
          const cacheResponse = await fetch('/api/ranking', { method: 'POST' });
          if (!cacheResponse.ok) {
            throw new Error('Cache initialization failed');
          }
          console.log('Cache inizializzata con successo');
        } catch (cacheError) {
          console.warn('Errore durante l\'inizializzazione della cache:', cacheError);
          setCacheError('Sistema di analisi non completamente pronto - alcune funzionalità potrebbero essere più lente');
        } finally {
          setInitializingCache(false);
        }
        
        setLoadingChampions(false);
      } catch (error) {
        console.error('Error loading champions:', error);
        setError('Errore nel caricamento dei campioni');
        setLoadingChampions(false);
      }
    };

    initializeApp();
  }, []);


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
      const response = await fetch(`/api/ranking?targetInput=${encodeURIComponent(targetInput)}`, { method: 'GET' }); //encodeURIComponent trasforma la stringa in un formato adatto agli url
      if (!response.ok) {
        throw new Error("Errore nella fetch del ranking");
      }
      const data = await response.json();
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
    const shouldSubmit = keyDownFunc(e)
    if(shouldSubmit){
      handleSubmit();
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
        {/* Background pattern (puntini sullo sfondo) */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 min-h-screen flex flex-col justify-center p-4 md:p-8">
          <Header />

          <GameStats attemptsCounter={attemptsCounter} />

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
                  disabled={loadingChampions || initializingCache}
                  autoComplete="off"
                />

                {/* Loading indicator for champions and cache */}
                {(loadingChampions || initializingCache) && (
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
                disabled={loading || loadingChampions || initializingCache || !champions.some(c => c.toLowerCase() === targetInput.toLowerCase()) || victory}
                className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center">Analizzando...</div>
                ) : (
                  "🔍 Analizza Campione"
                )}
              </button>
            </div>

            <ErrorAlert error={error} />

            {/* Cache initialization loading */}
            {initializingCache && (
              <div className="mt-4 p-4 bg-blue-900/30 border border-blue-500/50 rounded-lg">
                <div className="flex items-center justify-center space-x-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-300"></div>
                  <span className="text-blue-300 font-medium">Inizializzazione sistema di analisi...</span>
                </div>
                <p className="text-gray-400 text-sm text-center mt-2">
                  Questo processo potrebbe richiedere alcuni secondi per la prima volta
                </p>
              </div>
            )}

            {/* Cache error warning */}
            {cacheError && (
              <div className="mt-4 p-4 bg-yellow-900/30 border border-yellow-500/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400">⚠️</span>
                  <span className="text-yellow-300 text-sm">{cacheError}</span>
                </div>
              </div>
            )}

            {/* Results Section */}
            <LoadingAnalysis show={loading} />

            <ResultCard result={result} getDistanceColor={getDistanceColor} getDistanceMessage={getDistanceMessage} />

            <AttemptsList attempts={attempts} getDistanceColor={getDistanceColor} />

          </div>

          <Footer />
        </div>
      </div>
    </main>
  )
}
