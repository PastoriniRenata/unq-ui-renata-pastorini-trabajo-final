import { useEffect, useState } from "react";

const RANKING_STORAGE_KEY = "palabras-encadenadas-ranking";
const MAX_ENTRIES = 10;

const loadRanking = () => {
  try {
    const saved = localStorage.getItem(RANKING_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const useRanking = () => {
  const [entries, setEntries] = useState(loadRanking);

  useEffect(() => {
    try {
      localStorage.setItem(RANKING_STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // si no se puede guardar, el juego sigue igual
    }
  }, [entries]);

  const qualifies = (score) =>
    score > 0 &&
    (entries.length < MAX_ENTRIES || score > entries.at(-1).score);

  const addScore = (name, score) => {
    const newEntry = { name: name.trim(), score, date: Date.now() };
    setEntries((prev) =>
      [...prev, newEntry]
        .sort((a, b) => b.score - a.score || a.date - b.date)
        .slice(0, MAX_ENTRIES),
    );
  };

  return { entries, qualifies, addScore };
};