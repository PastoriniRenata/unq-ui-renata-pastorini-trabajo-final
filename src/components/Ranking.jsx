const Ranking = ({ entries }) => {
  return entries.length === 0 ? (
    <p>Todavía no hay puntajes</p>
  ) : (
    <ol className="list-group list-group-numbered">
      {entries.map((entry) => (
        <li
          key={entry.date}
          className="list-group-item d-flex justify-content-between"
        >
          {entry.name}
          <strong>{entry.score}</strong>
        </li>
      ))}
    </ol>
  );
};

export default Ranking;