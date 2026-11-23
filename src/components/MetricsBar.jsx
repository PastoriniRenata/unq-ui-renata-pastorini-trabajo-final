const MetricsBar = ( { wordCount, score, secondsLeft }) => {
  return (
    <header className="d-flex px-4 py-2 gap-3">
      <p className="mb-0"> <strong>Puntos: </strong> {score}</p>
      <p className="mb-0"> <strong>Palabras: </strong>{wordCount} </p>
      <p className="mb-0"> <strong>Tiempo: </strong>{secondsLeft} segundos</p>

      {/* aca va el ranking */}
      {/* aca va el "?" para ver las reglas - MODAL - */}
    </header>
  );
};

export default MetricsBar;
