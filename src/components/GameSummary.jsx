import SaveScoreForm from "./SaveScoreForm";

const GameSummary = ({
  score,
  wordCount,
  rankPosition,
  canSaveScore,
  onSaveScore,
  onPlayAgain,
  onShowRanking,
}) => {
  return (
    <div className="d-flex flex-column gap-3">
      <p className="font-pixel text-center text-secondary mb-0">SE ACABÓ EL TIEMPO</p>

      <div className="row g-3">
        <div className="col-6">
          <div className="brick font-pixel text-white text-center p-3 h-100">
            <div className="small">PALABRAS</div>
            <div className="fs-1">{wordCount}</div>
          </div>
        </div>
        <div className="col-6">
          <div className="bg-warning border border-4 border-dark font-pixel text-center p-3 h-100">
            <div className="small">PUNTAJE</div>
            <div className="fs-1">{score}</div>
          </div>
        </div>
      </div>

      {canSaveScore && (
        <div className="alert alert-success mb-0">
          <p className="font-pixel mb-2">¡ENTRASTE AL TOP 10! · PUESTO #{rankPosition}</p>
          <SaveScoreForm onSave={onSaveScore} />
        </div>
      )}

      <div className="d-flex justify-content-end gap-2 border-top pt-3">
        <button type="button" className="btn btn-light border font-pixel" onClick={onShowRanking}>
          VER TOP 10
        </button>
        <button type="button" className="btn btn-success font-pixel" onClick={onPlayAgain}>
          JUGAR DE NUEVO
        </button>
      </div>
    </div>
  );
};

export default GameSummary;