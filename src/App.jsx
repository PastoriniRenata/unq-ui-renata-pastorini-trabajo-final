import { useEffect, useRef, useState } from "react";
import {
  normalizeWord,
  isValidLength,
  hasOnlyLetters,
  isChained,
  isEmpty,
  isSingleWord,
  repeatedWord,
} from "./Validations";
import { validateWord } from "./service/api";

function App() {
  const [word, setWord] = useState("");
  const [wordsList, setWordsList] = useState([]);
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);
  const [disable, setDisable] = useState(true);

  const score = wordsList.reduce((total, p) => total + p.normalized.length, 0);
  const wordCount = wordsList.length;

  useEffect(() => {}, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (disable) {
      setMessage("");
      const normalize = normalizeWord(word);

      if (isEmpty(normalize)) {
        setMessage("Escribí una palabra para iniciar la partida");
        return;
      }

      if (!isSingleWord(normalize)) {
        setMessage("Una sola palabra por vez");
        return;
      }

      if (!hasOnlyLetters(normalize)) {
        setMessage("Se aceptan solo letras");
        return;
      }

      if (!isValidLength(normalize)) {
        setMessage("Esa letra sola no es una palabra");
        return;
      }

      if (!isChained(normalize, wordsList.at(-1)?.normalized)) {
        setMessage(
          `Probá con una palabra que empiece con "${wordsList.at(-1).normalized.at(-1)}"`,
        );
        return;
      }

      if (repeatedWord(normalize, wordsList)) {
        setMessage("Esa palabra ya la usaste");
        return;
      }
      setMessage("Verificando tu palabra");
      setDisable(false);

      validateWord(normalize)
        .then((res) => {
          if (res.data.exists) {
            setWordsList((prev) => [
              ...prev,
              { text: word, normalized: normalize },
            ]);
            setWord("");
            setMessage(`¡Bien! +${normalize.length}`);
            //aca se activa/resetea el contador
          } else {
            setWord("");
            setMessage("No encontramos esa palabra");
          }
        })
        .catch(() => setMessage("Algo salió mal. Probá de nuevo"))
        .finally(() => {
          inputRef.current.focus();
          setDisable(true);
        });
    } else {
      setMessage("Verificando tu palabra");
    }
  };

  return (
    <div>
      <h1 className="font-pixel">Palabras Encadenadas</h1>
      <p> Puntaje: {score}</p>
      <p> Palabras: {wordCount} </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="word">
          {wordsList.length > 0 ? (
            <>
              La próxima palabra empieza con{" "}
              <strong>{wordsList.at(-1).normalized.at(-1)} </strong>
            </>
          ) : (
            "Escribí cualquier palabra para empezar"
          )}
        </label>
        <input
          id="word"
          value={word}
          placeholder="Escribí una palabra"
          autoFocus
          ref={inputRef}
          onChange={(e) => setWord(e.target.value)}
        />
        <button className="btn" type="submit" disabled={!disable}>
          {disable ? "Enviar" : "Verificando…"}
        </button>
      </form>
      <p>{message}</p>
      {wordsList.toReversed().map((p) => (
        <p key={p.normalized}>{` --> ${p.text} --> +${p.normalized.length}`}</p>
      ))}
    </div>
  );
}

export default App;