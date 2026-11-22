import { useRef, useState } from "react";
import { useGame } from "./hooks/useGame";

function App() {
  const [word, setWord] = useState("");
  const inputRef = useRef(null);
  const { wordsList, message, isChecking, score, wordCount, nextLetter, submitWord } = useGame();

  const handleSubmit = (event) => {
    event.preventDefault();
    submitWord(word).then((shouldClear) => {
      if (shouldClear) setWord("");
      inputRef.current.focus();
    });
  };

  return (
    <div>
      <h1 className="font-pixel">Palabras Encadenadas</h1>
      <p> Puntaje: {score}</p>
      <p> Palabras: {wordCount} </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="word">
          {nextLetter ? (
            <>
              La próxima palabra empieza con <strong>{nextLetter}</strong>
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
        <button className="btn" type="submit" disabled={isChecking}>
          {isChecking ? "Verificando…" : "Enviar"}
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
