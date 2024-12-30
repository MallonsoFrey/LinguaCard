import { dataMobXContext } from "../DataMobXContext/DataMobXContext";
import { observer } from "mobx-react-lite";
import Card from "../Card/Card";

const CardAll = observer(() => {
  const words = dataMobXContext.words;
  const error = dataMobXContext.deleteWord.error;

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {words.map(({ english, russian, id, transcription }, index) => (
        <Card
          index={index}
          key={id}
          word={english}
          transcription={transcription}
          translation={russian}
          id={id}
          deleteWord={dataMobXContext.deleteWord}
        />
      ))}
    </>
  );
});

export default CardAll;
