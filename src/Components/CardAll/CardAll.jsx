import { useState, useContext } from "react";
import { DataContext } from "../DataContextProvider/DataContextProvider";
import Card from "../Card/Card";

export default function CardAll() {
  const { words, setWords } = useContext(DataContext);
  const [error, setError] = useState("");

  const updateWords = (updatedWord) => {
    setWords((prevWords) =>
      prevWords.map((word) => (word.id === updatedWord.id ? updatedWord : word))
    );
  };

  const deleteWord = async (id) => {
    try {
      const response = await fetch(
        `http://itgirlschool.justmakeit.ru/api/words/${id}`,
        { method: "DELETE" }
      );
      if (!response.ok)
        throw new Error(`Ошибка при удалении: ${response.status}`);

      setWords((prevWords) => prevWords.filter((word) => word.id !== id));
    } catch (error) {
      console.log("Ошибка удаления:", error.message);
      const err = error.message;
      setError(err);
    }
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {words.map(({ english, russian, id }, index) => (
        <Card
          index={index}
          key={id}
          word={english}
          translation={russian}
          id={id}
          deleteWord={deleteWord}
          updateWords={updateWords}
        />
      ))}
    </>
  );
}
