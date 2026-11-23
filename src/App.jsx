import { useRef, useState } from "react";
import { useGame } from "./hooks/useGame";
import MetricsBar from "./components/MetricsBar";
import GameSummary from "./components/GameSummary";
import WordInput from "./components/WordInput";
import ChainedWords from "./components/ChainedWords";

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
      {isGameOver ? (
        <GameSummary
          score={score}
          wordCount={wordCount}
          onPlayAgain={handlePlayAgain}
        />
      ) : (
        <div>
          <MetricsBar
            wordCount={wordCount}
            score={score}
            secondsLeft={secondsLeft}
          />

          <WordInput
            word={word}
            nextLetter={nextLetter}
            isChecking={isChecking}
            inputRef={inputRef}
            onWordChange={setWord}
            onSubmit={handleSubmit}
          />
          <p>{message}</p>
        </div>
      )}
      <ChainedWords wordsList={wordsList} />
    </div>
  );
};

export default App;
