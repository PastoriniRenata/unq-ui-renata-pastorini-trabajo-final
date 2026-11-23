import { useRef, useState } from "react";
import { useGame } from "../hooks/useGame";
import { useRanking } from "../hooks/useRanking";
import { useGuide } from "../hooks/useGuide";
import Background from "./Background";
import MetricsBar from "./MetricsBar";
import WordInput from "./WordInput";
import GameMessage from "./GameMessage";
import TimeBar from "./TimeBar";
import ChainedWords from "./ChainedWords";
import Ranking from "./Ranking";
import Modal from "./Modal";
import Rules from "./Rules";
import GameSummary from "./GameSummary";
import Footer from "./Footer";

const Game = () => {
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
    isTimerRunning,
  } = useGame();
  const { entries, qualifies, addScore } = useRanking();
  const { isGuideOpen, openGuide, closeGuide } = useGuide();
  const bestScore = entries[0]?.score ?? 0;
  const rankPosition = entries.filter((entry) => entry.score >= score).length + 1;

  const handleSubmit = (event) => {
    event.preventDefault();
    submitWord(word).then((shouldClear) => {
      if (shouldClear) setWord("");
      inputRef.current?.focus();
    });
  };

  const handlePlayAgain = () => {
    if (qualifies(score) && !isScoreSaved) {
      addScore("", score);
    }
    playAgain();
    setWord("");
  };

  const handleSaveScore = (name) => {
    addScore(name, score);
    markScoreSaved();
    setIsRankingOpen(true);
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
    <div className="d-flex flex-column min-vh-100 bg-opacity-100">
      <Background />
      <main className="flex-grow-1 pb-5">
        <h1 className="font-pixel text-outline text-white text-center my-4">
          Palabras Encadenadas
        </h1>
        <MetricsBar
          wordCount={wordCount}
          score={score}
          onShowRanking={() => setIsRankingOpen(true)}
          onShowGuide={openGuide}
          bestScore={bestScore}
        />
        <div className="row g-3 mx-0">
          <div className="col-lg-8">
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
            <ChainedWords wordsList={wordsList} />
          </div>

          <aside className="col-lg-3 ms-auto d-none d-lg-block">
            <Ranking entries={entries} />
          </aside>
        </div>

        {isGuideOpen && (
          <Modal title="Cómo se juega" onClose={handleCloseGuide}>
            <Rules onStart={handleCloseGuide} />
          </Modal>
        )}
        {isGameOver && !isRankingOpen && (
          <Modal title="Fin de la partida">
            <GameSummary
              score={score}
              wordCount={wordCount}
              rankPosition={rankPosition}
              canSaveScore={qualifies(score) && !isScoreSaved}
              onSaveScore={handleSaveScore}
              onPlayAgain={handlePlayAgain}
              onShowRanking={() => setIsRankingOpen(true)}
            />
          </Modal>
        )}
        {isRankingOpen && (
          <Modal title="Ranking" onClose={handleCloseRanking}>
            <Ranking entries={entries} />
          </Modal>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Game;
