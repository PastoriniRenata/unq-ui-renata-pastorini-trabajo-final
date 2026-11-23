import Metrics from "./Metrics";

const MetricsBar = ({ wordCount, score, secondsLeft }) => {
  return (
    <header className="d-flex px-4 py-2 gap-3">
      <Metrics score={score} wordCount={wordCount} />
      <p className="mb-0">
        <strong>Tiempo:</strong> {secondsLeft} segundos
      </p>

      {/* aca va el ranking */}
      {/* aca va el "?" para ver las reglas - MODAL - */}
    </header>
  );
};

export default MetricsBar;