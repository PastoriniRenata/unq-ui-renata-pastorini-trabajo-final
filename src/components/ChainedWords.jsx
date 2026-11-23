const ChainedWords = ({ wordsList }) => {
  return (
    <>
      {wordsList.toReversed().map((p) => (
        <p key={p.normalized}>{` --> ${p.text} --> +${p.normalized.length}`}</p>
      ))}
    </>
  );
};

export default ChainedWords;
