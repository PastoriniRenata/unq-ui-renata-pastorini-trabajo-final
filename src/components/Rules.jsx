const STEPS = [
  {
    title: "Arrancá",
    text: "Escribí cualquier palabra que exista. Esa es la primera de tu cadena",
  },
  {
    title: "Encadená",
    text: "Cada palabra nueva empieza con la última letra de la anterior: casa → árbol → luna",
  },
  {
    title: "Sumá",
    text: "Cada letra vale 1 punto. Las tildes no cambian la letra (á = a), pero la ñ sí",
  },
  {
    title: "Corré",
    text: "Tenés 15 segundos por palabra. Cada palabra válida reinicia el reloj; si llega a 0, termina la partida",
  },
];

const Rules = ({ onStart }) => {
  return (
    <div className="d-flex flex-column gap-3">
      <ol className="list-unstyled d-flex flex-column gap-3 mb-0">
        {STEPS.map((step, index) => (
          <li key={step.title} className="d-flex gap-3">
            <span
              className="question-block question-block-sm font-pixel d-flex align-items-center justify-content-center flex-shrink-0"
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <div>
              <h3 className="font-pixel fs-6 text-uppercase mb-1">{step.title}</h3>
              <p className="mb-0">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="alert alert-warning mb-0">
        <strong>No valen:</strong> palabras inventadas, repetidas o que no respeten la letra
        <br />
        <strong>Valen:</strong> palabras de 2 o más letras
      </div>

      <p className="small text-danger mb-0">El reloj no se detiene si abrís esta guía en plena partida</p>

      <div className="d-flex justify-content-end border-top pt-3">
        <button type="button" className="btn btn-success font-pixel" onClick={onStart}>
          ¡A JUGAR!
        </button>
      </div>
    </div>
  );
};

export default Rules;