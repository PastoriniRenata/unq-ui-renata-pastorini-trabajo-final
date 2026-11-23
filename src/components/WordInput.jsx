const WordInput = ({ word, nextLetter, isChecking, inputRef, onWordChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="d-flex align-items-center gap-3 p-3">
      <div
        className="question-block font-pixel d-flex align-items-center justify-content-center flex-shrink-0"
        aria-hidden="true"
      >
        {nextLetter ? nextLetter.toUpperCase() : "?"}
      </div>
      <label htmlFor="word" className="visually-hidden">
        {nextLetter ? `Palabra que empiece con ${nextLetter.toUpperCase()}` : "Palabra"}
      </label>
      <div className="input-group flex-grow-1">
        <input
          id="word"
          className="form-control"
          value={word}
          placeholder={
            !nextLetter
              ? "Escribí cualquier palabra para empezar"
              : `Escribí una palabra que empiece con ${nextLetter.toUpperCase()}`
          }
          autoFocus
          ref={inputRef}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="send"
          onChange={(e) => onWordChange(e.target.value)}
          readOnly={isChecking}
        />
        <button className="btn btn-success font-pixel" type="submit" disabled={isChecking}>
          {isChecking ? "VERIFICANDO…" : "ENVIAR"}
        </button>
      </div>
    </form>
  );
};

export default WordInput;