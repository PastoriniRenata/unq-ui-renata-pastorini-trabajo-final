import Metrics from "./Metrics";
import Ranking from "./Ranking";
import SaveScoreForm from "./SaveScoreForm";

const GameSummary = ({ score, wordCount, entries, onPlayAgain, canSaveScore, onSaveScore }) => {
  return (
    <div>
      <h2>Se acabó el tiempo</h2>
      <div className="d-flex px-5 gap-5 align-items-center">
        <Metrics score={score} wordCount={wordCount} isGameOver />
        <button className="btn btn-success" type="button" onClick={onPlayAgain}>
          Jugar de nuevo
        </button>
      </div>
      {canSaveScore && <SaveScoreForm onSave={onSaveScore} />}
      <Ranking entries={entries} />
    </div>
  );
};

export default GameSummary