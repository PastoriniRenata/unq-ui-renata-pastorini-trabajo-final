import { useEffect, useState } from "react";
import {
  normalizeWord,
  isValidLength,
  hasOnlyLetters,
  isChained,
  isEmpty,
  isSingleWord,
  repeatedWord,
} from "../Validations";
import { validateWord } from "../service/api";
import { useTimer } from "./useTimer";

const CHAIN_STORAGE_KEY = "palabras-encadenadas";
const GAME_OVER_STORAGE_KEY = "palabras-encadenadas-terminada";
const SCORE_SAVED_STORAGE_KEY = "palabras-encadenadas-guardado";

const loadChain = () => {
  try {
    const saved = sessionStorage.getItem(CHAIN_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const loadGameOver = () => {
  try {
    return sessionStorage.getItem(GAME_OVER_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
};

const loadScoreSaved = () => {
  try {
    return sessionStorage.getItem(SCORE_SAVED_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
};

export const useGame = () => {
  const [wordsList, setWordsList] = useState(loadChain);
  const [message, setMessage] = useState({ text: "", type: "info" });
  const [isChecking, setIsChecking] = useState(false);
  const [isGameOver, setIsGameOver] = useState(loadGameOver);
  const [isScoreSaved, setIsScoreSaved] = useState(loadScoreSaved);

  const showError = (text) => setMessage({ text, type: "error" });
  const showSuccess = (text) => setMessage({ text, type: "success" });
  const showInfo = (text) => setMessage({ text, type: "info" });
  const clearMessage = () => setMessage({ text: "", type: "info" });

  const timer = useTimer(() => {
    setIsGameOver(true);
    clearMessage();
  });

  const score = wordsList.reduce((total, p) => total + p.normalized.length, 0);
  const wordCount = wordsList.length;

  const nextLetter = wordsList.at(-1)?.normalized.at(-1);

  useEffect(() => {
    try {
      sessionStorage.setItem(CHAIN_STORAGE_KEY, JSON.stringify(wordsList));
    } catch {
      // si no se puede guardar, el juego sigue igual
    }
  }, [wordsList]);

  useEffect(() => {
    try {
      sessionStorage.setItem(GAME_OVER_STORAGE_KEY, String(isGameOver));
    } catch {
      // si no se puede guardar, el juego sigue igual
    }
  }, [isGameOver]);

  useEffect(() => {
    try {
      sessionStorage.setItem(SCORE_SAVED_STORAGE_KEY, String(isScoreSaved));
    } catch {
      // si no se puede guardar, el juego sigue igual
    }
  }, [isScoreSaved]);

  useEffect(() => {
    if (message.text === "" || message.type === "info") return;

    const id = setTimeout(clearMessage, 4000);
    return () => clearTimeout(id);
  }, [message]);

  const submitWord = async (word) => {
    if (isChecking || isGameOver) return false;

    clearMessage();
    const normalize = normalizeWord(word);

    if (isEmpty(normalize)) {
      showError(`Escribí una palabra${wordCount === 0 ? " para iniciar la partida" : ""}`);
      return false;
    }

    if (!isSingleWord(normalize)) {
      showError("Una sola palabra por vez");
      return false;
    }

    if (!hasOnlyLetters(normalize)) {
      showError("Se aceptan solo letras");
      return false;
    }

    if (!isValidLength(normalize)) {
      showError("Se aceptan palabras de 2 letras o más");
      return false;
    }

    if (!isChained(normalize, wordsList.at(-1)?.normalized)) {
      showError(`La palabra debe iniciar con "${nextLetter}"`);
      return false;
    }

    if (repeatedWord(normalize, wordsList)) {
      showError("Esa palabra ya la usaste");
      return false;
    }
    showInfo("Verificando tu palabra");
    setIsChecking(true);

    timer.pause();

    return validateWord(normalize)
      .then((res) => {
        if (res.data.exists) {
          setWordsList((prev) => [...prev, { text: word.trim(), normalized: normalize }]);
          showSuccess(`¡Bien! +${normalize.length}`);
          timer.restart();
        } else {
          showError("No encontramos esa palabra");
          timer.resume();
        }

        return true;
      })
      .catch(() => {
        showError("Algo salió mal. Probá de nuevo");
        timer.resume();

        return false;
      })
      .finally(() => setIsChecking(false));
  };

  const playAgain = () => {
    setWordsList([]);
    setIsGameOver(false);
    setIsScoreSaved(false);
    clearMessage();
    timer.reset();
  };

  return {
    wordsList,
    message,
    isChecking,
    score,
    wordCount,
    nextLetter,
    submitWord,
    secondsLeft: timer.secondsLeft,
    isGameOver,
    playAgain,
    isScoreSaved,
    markScoreSaved: () => setIsScoreSaved(true),
    isTimerRunning: timer.isRunning,
  };
};
