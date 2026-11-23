const ChainedWords = ({ wordsList }) => {
  const count = wordsList.length;

  return (
    <div className="card mx-3 bg-transparent border border-4 border-white">
      <div className="card-header font-pixel small bg-white">
        TU CADENA · {count} {count === 1 ? "PALABRA" : "PALABRAS"}
      </div>
      <div className="card-body">
        {count === 0 ? (
          <p className="text-white text-center my-4">Tu cadena de palabras aparece acá</p>
        ) : (
          <ol className="list-unstyled mb-0">
            {wordsList.toReversed().map((p, index) => (
              <li key={p.normalized}>
                {index > 0 && <div className="text-white ms-5 small">▲</div>}
                <div className="d-flex align-items-center gap-3">
                  <span className="font-pixel fs-5 text-white text-outline">
                    {String(count - index).padStart(2, "0")}
                  </span>
                  <div
                    className={`brick font-pixel text-white flex-grow-1 d-flex justify-content-between align-items-center px-3 py-2 ${index === 0 ? "border-warning" : ""}`}
                  >
                    <span className="fs-5">{p.text}</span>
                    <span className="small">+{p.normalized.length}</span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

export default ChainedWords;
