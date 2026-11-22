import { useState } from "react";
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

export const useGame = () => {
  const [wordsList, setWordsList] = useState([]);
  const [message, setMessage] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  const score = wordsList.reduce((total, p) => total + p.normalized.length, 0);
  const wordCount = wordsList.length;

  const nextLetter = wordsList.at(-1)?.normalized.at(-1);

  const submitWord = async (word) => {
    if (isChecking) return false;
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
      setMessage(
        `La palabra debe iniciar con "${nextLetter}"`,
      );
      return false;
    }

    if (repeatedWord(normalize, wordsList)) {
      setMessage("Esa palabra ya la usaste");
      return false;
    }
    setMessage("Verificando tu palabra");
    setIsChecking(true);

    return validateWord(normalize)
      .then((res) => {
        if (res.data.exists) {
          setWordsList((prev) => [
            ...prev,
            { text: word, normalized: normalize },
          ]);
          setMessage(`¡Bien! +${normalize.length}`);
        } else {
          setMessage("No encontramos esa palabra");
        }
        return true;
      })
      .catch(() => {
        setMessage("Algo salió mal. Probá de nuevo");
        return false;
      })
      .finally(() => setIsChecking(false));
  };

  return {
    wordsList,
    message,
    isChecking,
    score,
    wordCount,
    nextLetter,
    submitWord,
  };
};
