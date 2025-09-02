"use client";

import { useEffect, useMemo, useState } from "react";

export type Attempt = { ranking: number; targetChamp: string };

type UseChampionSuggestionsParams = {
  targetInput: string;
  champions: string[];
  attempts: Attempt[];
  result?: Attempt;
};

type UseChampionSuggestionsReturn = {
  filteredChampions: string[];
  showSuggestions: boolean;
  highlightedSuggestion: number;
  setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
  setHighlightedSuggestion: React.Dispatch<React.SetStateAction<number>>;
  handleChampionSelect: (championName: string) => void;
};

export function useChampionSuggestions(
  params: UseChampionSuggestionsParams,
  setTargetInput: (value: string) => void
): UseChampionSuggestionsReturn {
  const { targetInput, champions, attempts, result } = params;

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedSuggestion, setHighlightedSuggestion] = useState<number>(-1);

  //filtra i campioni da mostrare nei suggerimenti
  const filteredChampions = useMemo(() => {
    if (
      targetInput.trim() === "" ||
      champions.some((c) => c.toLowerCase() === targetInput.toLowerCase())
    ) {
      return [];
    }

    return champions.filter(
      (champion) =>
        champion.toLowerCase().startsWith(targetInput.toLowerCase()) &&
        !attempts.some((a) => a.targetChamp === champion) &&
        result?.targetChamp != champion
    );
  }, [targetInput, champions, attempts, result]);

  //gestisce quando mostrare i suggerimenti
  useEffect(() => {
    if (
      targetInput.trim() === "" ||
      champions.some((c) => c.toLowerCase() === targetInput.toLowerCase())
    ) {
      setShowSuggestions(false);
      setHighlightedSuggestion(-1);
      return;
    }

    setShowSuggestions(filteredChampions.length > 0);
    setHighlightedSuggestion(-1);
  }, [targetInput, champions, filteredChampions]);

  //gestisce la scelta di uno dei suggerimenti
  const handleChampionSelect = (championName: string) => {
    setTargetInput(championName);
    setShowSuggestions(false);
    setHighlightedSuggestion(-1);
  };

  return {
    filteredChampions,
    showSuggestions,
    highlightedSuggestion,
    setShowSuggestions,
    setHighlightedSuggestion,
    handleChampionSelect,
  };
}


