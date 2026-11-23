const Metrics = ({ score, wordCount, isGameOver }) => {
  return (
    <>
      <p className="mb-0">
        <strong>{isGameOver ? "Puntaje final" : "Puntaje"}: </strong> {score}
      </p>
      <p className="mb-0">
        <strong>Palabras encadenadas: </strong> {wordCount}
      </p>
    </>
  );
};

export default Metrics;
