import { useRef, useState } from "react";
import { useGame } from "./hooks/useGame";
import MetricsBar from "./components/MetricsBar";

const App = () => {
  const [word, setWord] = useState("");
  const inputRef = useRef(null);
  const {
    wordsList,
    message,
    isChecking,
    score,
    wordCount,
    nextLetter,
    submitWord,
    secondsLeft,
    isGameOver,
    playAgain,
  } = useGame();

  const handleSubmit = (event) => {
    event.preventDefault();
    submitWord(word).then((shouldClear) => {
      if (shouldClear) setWord("");
      inputRef.current?.focus();
    });
  };

  const handlePlayAgain = () => {
    playAgain();
    setWord("");
  };

  return (
    <div>
      <h1 className="font-pixel">Palabras Encadenadas</h1>
 
      <MetricsBar
        wordCount={wordCount}
        score={score}
        secondsLeft={secondsLeft}
      />
    
      {isGameOver ? (
        <div>
          <h2>Fin de la partida</h2>
          <p>Puntaje final: {score}</p>
          <p>Palabras encadenadas: {wordCount}</p>
          <button
            className="btn btn-success"
            type="button"
            onClick={handlePlayAgain}
          >
            Jugar de nuevo
          </button>
        </div>
      ) : (
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
          <button
            className="btn btn-success"
            type="submit"
            disabled={isChecking}
          >
            {isChecking ? "Verificando…" : "Enviar"}
          </button>
        </form>
      )}

      <p>{message}</p>
      {wordsList.toReversed().map((p) => (
        <p key={p.normalized}>{` --> ${p.text} --> +${p.normalized.length}`}</p>
      ))}
    
    </div>
  );
}

export default App;
