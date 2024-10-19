// eslint-disable-next-line react/prop-types
function Card({ word, translation }) {
  return (
    <>
      <h1>{word}</h1>
      <p>{translation}</p>
    </>
  );
}

export default Card;
