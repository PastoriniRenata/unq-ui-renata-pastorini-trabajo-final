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

export const useGame = () => {
  const [wordsList, setWordsList] = useState(loadChain);
  const [message, setMessage] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isGameOver, setIsGameOver] = useState(loadGameOver);
  const timer = useTimer(() => {
    setIsGameOver(true);
    setMessage("Se acabó el tiempo");
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

  const submitWord = async (word) => {
    if (isChecking || isGameOver) return false;

    setMessage("");
    const normalize = normalizeWord(word);

    if (isEmpty(normalize)) {
      setMessage(
        wordCount === 0
          ? "Escribí una palabra para iniciar la partida"
          : "Debes ingresar una palabra",
      );
      return false;
    }

    if (!isSingleWord(normalize)) {
      setMessage("Una sola palabra por vez");
      return false;
    }

    if (!hasOnlyLetters(normalize)) {
      setMessage("Se aceptan solo letras");
      return false;
    }

    if (!isValidLength(normalize)) {
      setMessage("Esa letra sola no es una palabra");
      return false;
    }

    if (!isChained(normalize, wordsList.at(-1)?.normalized)) {
      setMessage(`La palabra debe iniciar con "${nextLetter}"`);
      return false;
    }

    if (repeatedWord(normalize, wordsList)) {
      setMessage("Esa palabra ya la usaste");
      return false;
    }
    setMessage("Verificando tu palabra");
    setIsChecking(true);

    timer.pause();

    return validateWord(normalize)
      .then((res) => {
        if (res.data.exists) {
          setWordsList((prev) => [
            ...prev,
            { text: word, normalized: normalize },
          ]);
          setMessage(`¡Bien! +${normalize.length}`);
          timer.restart();
        } else {
          setMessage("No encontramos esa palabra");
          timer.resume();
        }

        return true;
      })
      .catch(() => {
        setMessage("Algo salió mal. Probá de nuevo");
        timer.resume();

        return false;
      })
      .finally(() => setIsChecking(false));
  };

  const playAgain = () => {
    setWordsList([]);
    setIsGameOver(false);
    setMessage("");
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
  };
};
