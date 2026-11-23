const WordInput = ({ word, nextLetter, isChecking, inputRef, onWordChange, onSubmit }) => {

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="word">
          {nextLetter ? (
            <>
              La próxima palabra empieza con <strong>{nextLetter}</strong>
            </>
          ) : (
            "Escribí cualquier palabra para empezar"
          )}
        </label>
        <input
          id="word"
          value={word}
          placeholder="Escribí una palabra"
          autoFocus
          ref={inputRef}
          onChange={(e) => onWordChange(e.target.value)}
          readOnly={isChecking}
        />
        <button className="btn btn-success" type="submit" disabled={isChecking}>
          {isChecking ? "Verificando…" : "Enviar"}
        </button>
      </form>
    </div>
  );
};

export default WordInput;
