import { useRef, useState } from "react";
import { useGame } from "./hooks/useGame";
import MetricsBar from "./components/MetricsBar";
import GameSummary from "./components/GameSummary";
import WordInput from "./components/WordInput";
import ChainedWords from "./components/ChainedWords";
import { useRanking } from "./hooks/useRanking";
import Modal from "./components/Modal";
import Ranking from "./components/Ranking";
import Rules from "./components/Rules";
import { useGuide } from "./hooks/useGuide";
import Background from "./components/Background";
import Footer from "./components/Footer";
import GameMessage from "./components/GameMessage";
import TimeBar from "./components/TimeBar";

const App = () => {
  const [word, setWord] = useState("");
  const [isRankingOpen, setIsRankingOpen] = useState(false);
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
    isScoreSaved,
    markScoreSaved,
    isTimerRunning
  } = useGame();
  const { entries, qualifies, addScore } = useRanking();
  const { isGuideOpen, openGuide, closeGuide } = useGuide();

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

  const handleSaveScore = (name) => {
    addScore(name, score);
    markScoreSaved();
  };

  const handleCloseRanking = () => {
    setIsRankingOpen(false);
    inputRef.current?.focus();
  };

  const handleCloseGuide = () => {
    closeGuide();
    inputRef.current?.focus();
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Background />
      <main className="flex-grow-1 pb-5">
        <h1 className="font-pixel">Palabras Encadenadas</h1>
        <div>
          <MetricsBar
            wordCount={wordCount}
            score={score}
            secondsLeft={secondsLeft}
            onShowRanking={() => setIsRankingOpen(true)}
            onShowGuide={openGuide}
          />

          <WordInput
            word={word}
            nextLetter={nextLetter}
            isChecking={isChecking}
            inputRef={inputRef}
            onWordChange={setWord}
            onSubmit={handleSubmit}
          />
          <GameMessage message={message} />
          <TimeBar secondsLeft={secondsLeft} isRunning={isTimerRunning} />
        </div>
        <ChainedWords wordsList={wordsList} />
        {isRankingOpen && (
          <Modal title="Ranking" onClose={handleCloseRanking}>
            <Ranking entries={entries} />
          </Modal>
        )}

        {isGuideOpen && (
          <Modal title="Cómo se juega" onClose={handleCloseGuide}>
            <Rules />
          </Modal>
        )}
        {isGameOver && (
          <Modal title="Se acabó el tiempo">
            <GameSummary
              score={score}
              wordCount={wordCount}
              entries={entries}
              onPlayAgain={handlePlayAgain}
              canSaveScore={qualifies(score) && !isScoreSaved}
              onSaveScore={handleSaveScore}
            />
          </Modal>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
