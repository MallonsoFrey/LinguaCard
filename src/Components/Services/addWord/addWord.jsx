import { useContext, useState } from "react";
import Button from "../../Button/Button";
import { DataContext } from "../../DataContextProvider/DataContextProvider";

export default function AddWord() {
  const { serverDataChange } = useContext(DataContext);
  const [data, setData] = useState({
    id: "",
    english: "",
    transcription: "",
    russian: "",
    tags: "",
    tags_json: "[]",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const clearInputs = () => {
    setData({ ...data, english: "", transcription: "", russian: "" });
  };

  const addToServer = async (e) => {
    e.preventDefault();
    if (!data.english || !data.russian) return;
    setIsLoading(true); //HERE????????????

    try {
      const res = await fetch("/api/words/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      clearInputs();

      if (!res.ok) throw new Error(`HTTP error occured: ${res.status}`);
      const addedWord = await res.json(); //если удалось, то преобразуем ответ сервера в json
      if (addedWord) {
        serverDataChange(); //меняем флаг в элементе контекста, чтобы локально слова тоже поменялись
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="form">
      <label>
        Word
        <input
          type="text"
          name="english"
          placeholder="your new word"
          value={data.english}
          onChange={handleChange}
        />
      </label>
      <label>
        Transcription(optional)
        <input
          type="text"
          name="transcription"
          placeholder="its transcription"
          value={data.transcription}
          onChange={handleChange}
        />
      </label>
      <label>
        Translation
        <input
          type="text"
          name="russian"
          placeholder="its translation"
          value={data.russian}
          onChange={handleChange}
        />
      </label>
      <Button
        text={isLoading ? "Adding..." : "Add"}
        className="add-btn"
        onClick={addToServer}
      />
    </form>
  );
}
