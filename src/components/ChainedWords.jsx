const ChainedWords = ({ wordsList }) => {
  return (
    <div className="d-flex flex-wrap gap-2 p-3">
      {wordsList.toReversed().map((p) => (
        <div key={p.normalized} className="brick font-pixel text-white text-center p-2">
          <div>{p.text}</div>
          <div className="small">+{p.normalized.length}</div>
        </div>
      
      ))}
    </div>
  );
};

export default ChainedWords;
