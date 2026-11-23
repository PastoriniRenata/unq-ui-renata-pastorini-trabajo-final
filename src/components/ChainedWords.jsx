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
                {index > 0 && (
                  <div className="row gx-3">
                    <div className="col offset-2 offset-sm-1 text-white small ps-4">▲</div>
                  </div>
                )}
                <div className="row g-3 align-items-center">
                  <span className="col-2 col-sm-1 text-end font-pixel fs-5 text-white text-outline">
                    {String(count - index).padStart(2, "0")}
                  </span>
                  <div
                    className={`col brick font-pixel text-white d-flex justify-content-between align-items-center gap-2 px-3 py-2 ${index === 0 ? "border-warning" : ""}`}
                  >
                    <span className="fs-5 text-break">{p.text}</span>
                    <span className="small flex-shrink-0">+{p.normalized.length}</span>
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
