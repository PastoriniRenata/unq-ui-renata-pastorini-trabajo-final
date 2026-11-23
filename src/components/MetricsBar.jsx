const MetricsBar = ({ wordCount, score, bestScore, onShowRanking, onShowGuide }) => {
  return (
    <header className="d-flex flex-wrap align-items-center gap-4 px-3 py-2 font-pixel text-white text-outline">
      <div>
        <span className="d-block small">PUNTAJE</span>
        {String(score).padStart(6, "0")}
      </div>
      <div>
        <span className="d-block small">PALABRAS</span>×{String(wordCount).padStart(2, "0")}
      </div>
      <div>
        <span className="d-block small">RECORD</span>
        {String(bestScore).padStart(6, "0")}
      </div>

      <div className="ms-auto d-flex gap-2">
        <button
          type="button"
          className="btn btn-warning btn-sm"
          aria-label="Cómo se juega"
          onClick={onShowGuide}
        >
          ?
        </button>
        <button
          type="button"
          className="btn btn-warning btn-sm d-lg-none"
          aria-label="Ver ranking"
          onClick={onShowRanking}
        >
          <i className="bi bi-trophy-fill" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
};

export default MetricsBar;
