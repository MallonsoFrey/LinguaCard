import { useState } from "react";
import Button from "../../Button/Button";
import { observer } from "mobx-react-lite";
import { dataMobXContext } from "../../DataMobXContext/DataMobXContext";

const AddWord = observer(() => {
  const [data, setData] = useState({
    id: "",
    english: "",
    transcription: "",
    russian: "",
    tags: "",
    tags_json: "[]",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const clearInputs = () => {
    setData({ ...data, english: "", transcription: "", russian: "" });
  };

  const addNewWord = (data) => {
    clearInputs();
    dataMobXContext.addToServer(data);
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
        text={dataMobXContext.isLoading ? "Adding..." : "Add"}
        className="add-btn"
        onClick={(e) => {
          e.preventDefault();
          console.log(data);
          addNewWord(data);
        }}
      />
    </form>
  );
});

export default AddWord;
