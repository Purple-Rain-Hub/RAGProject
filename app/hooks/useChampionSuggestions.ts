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
  keyDownFunc: (e: React.KeyboardEvent) => boolean;
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

  const keyDownFunc = (e: React.KeyboardEvent) =>{
    if (e.key === 'ArrowDown') {
      if (showSuggestions && filteredChampions.length > 0) {
        e.preventDefault();
        const next = highlightedSuggestion < filteredChampions.length - 1 ? highlightedSuggestion + 1 : 0;
        setHighlightedSuggestion(next);
      }
      return false;
    }

    if (e.key === 'ArrowUp') {
      if (showSuggestions && filteredChampions.length > 0) {
        e.preventDefault();
        const next = highlightedSuggestion > 0 ? highlightedSuggestion - 1 : filteredChampions.length - 1;
        setHighlightedSuggestion(next);
      }
      return false;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredChampions.length > 0 && showSuggestions) {
        const suggestionToSelect = highlightedSuggestion >= 0 ? highlightedSuggestion : 0;
        handleChampionSelect(filteredChampions[suggestionToSelect]);
      } else {
        return true
      }
      return false;
    }

    if (e.key === 'Escape') {
      setShowSuggestions(false);
      setHighlightedSuggestion(-1);
      return false;
    }

    return false
  }

  return {
    filteredChampions,
    showSuggestions,
    highlightedSuggestion,
    setShowSuggestions,
    setHighlightedSuggestion,
    handleChampionSelect,
    keyDownFunc
  };
}


