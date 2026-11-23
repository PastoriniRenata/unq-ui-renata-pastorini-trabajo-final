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
        <span className="d-block small">RÉCORD</span>
        {String(bestScore).padStart(6, "0")}
      </div>

      <div className="ms-auto d-flex gap-2">
        <button
          type="button"
          className="btn btn-warning p-2 fs-5 d-flex align-items-center justify-content-center"
          aria-label="Cómo se juega"
          onClick={onShowGuide}
        >
          <i className="bi bi-question-lg lh-1" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="btn btn-warning p-2 fs-5 d-flex d-lg-none align-items-center justify-content-center"
          aria-label="Ver ranking"
          onClick={onShowRanking}
        >
          <i className="bi bi-trophy-fill lh-1" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
};

export default MetricsBar;