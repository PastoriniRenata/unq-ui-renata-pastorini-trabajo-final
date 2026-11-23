const MAX_ROWS = 10;

const Ranking = ({ entries }) => {
  const rows = Array.from({ length: MAX_ROWS }, (_, index) => entries[index]);

  return (
    <div className="card">
      <div className="card-header font-pixel small bg-body-secondary">TOP 10</div>
      <ol className="list-group list-group-flush">
        {rows.map((entry, index) => (
          <li
            key={index}
            className={`list-group-item d-flex gap-3 py-1 ${index % 2 === 0 ? "bg-body-secondary" : "bg-white"}`}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span className="text-uppercase">{entry ? entry.name : "---"}</span>
            <span className="ms-auto fw-bold">{entry ? entry.score : "--"}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Ranking;