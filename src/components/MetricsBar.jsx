import Metrics from "./Metrics";

const MetricsBar = ({
  wordCount,
  score,
  secondsLeft,
  onShowRanking,
  onShowGuide,
}) => {
  return (
    <header className="d-flex align-items-center px-4 py-2 gap-3">
      <Metrics score={score} wordCount={wordCount} />
      <p className="mb-0">
        <strong>Tiempo:</strong> {secondsLeft} segundos
      </p>
      <div className="ms-auto d-flex gap-2">
        <button
          type="button"
          className="btn btn-light btn-sm"
          aria-label="Cómo se juega"
          onClick={onShowGuide}
        >
          ?
        </button>

        <button
          type="button"
          className="btn btn-warning btn-sm"
          onClick={onShowRanking}
        >
          Ranking
        </button>
      </div>
    </header>
  );
};

export default MetricsBar;
