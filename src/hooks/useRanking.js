import { useEffect, useState } from "react";

const RANKING_STORAGE_KEY = "palabras-encadenadas-ranking";
const PLAYER_COUNT_STORAGE_KEY = "palabras-encadenadas-jugadores";
const MAX_ENTRIES = 10;

const loadRanking = () => {
  try {
    const saved = localStorage.getItem(RANKING_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const nextPlayerName = () => {
  let count = 0;
  try {
    count = Number(localStorage.getItem(PLAYER_COUNT_STORAGE_KEY)) || 0;
  } catch {
    // si no se puede leer, arranca de 0
  }
  count += 1;
  try {
    localStorage.setItem(PLAYER_COUNT_STORAGE_KEY, String(count));
  } catch {
    // si no se puede guardar, el juego sigue igual
  }
  return `Player${String(count).padStart(3, "0")}`;
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
    const newEntry = { name: name.trim() || nextPlayerName(), score, date: Date.now() };
    setEntries((prev) =>
      [...prev, newEntry]
        .sort((a, b) => b.score - a.score || a.date - b.date)
        .slice(0, MAX_ENTRIES),
    );
  };

  return { entries, qualifies, addScore };
};