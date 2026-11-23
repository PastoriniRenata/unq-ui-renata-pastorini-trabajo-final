const WordInput = ({ word, nextLetter, isChecking, inputRef, onWordChange, onSubmit }) => {
  return (
    <div>
      <form onSubmit={onSubmit} className="d-flex align-items-center gap-3 p-3">
        <div className="question-block font-pixel" aria-hidden="true">
          {nextLetter ? nextLetter.toUpperCase() : "?"}
        </div>
        <div className="flex-grow-1">
          <label htmlFor="word" className="form-label mb-1">
            {nextLetter ? (
              <>
                La próxima palabra empieza con <strong>{nextLetter}</strong>
              </>
            ) : (
              "Escribí cualquier palabra para empezar"
            )}
          </label>
          <div className="input-group">
            <input
              id="word"
              className="form-control"
              value={word}
              placeholder="Escribí una palabra"
              autoFocus
              ref={inputRef}
              onChange={(e) => onWordChange(e.target.value)}
              readOnly={isChecking}
            />
            <button className="btn btn-success font-pixel" type="submit" disabled={isChecking}>
              {isChecking ? "Verificando…" : "Enviar"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WordInput;
