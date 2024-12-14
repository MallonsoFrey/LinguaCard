/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import Button from "../Button/Button";
import "../Button/Button.scss";
import "./Card.scss";

function Card({ word, translation, index, id, deleteWord, updateWords }) {
  const [hiddenTranslation, setHiddenTranslation] = useState(true);
  const [isForEdit, setIsForEdit] = useState(false);
  const [inputWord, setInputWord] = useState(word);
  const [inputTranslation, setInputTranslation] = useState(translation);
  const [isLoading, setIsLoading] = useState(false);

  const wordInputRef = useRef(null);
  const translationInputRef = useRef(null);

  const handleHiddenTranslation = () =>
    setHiddenTranslation(!hiddenTranslation);

  const editText = () => setIsForEdit(true);

  const cancelText = () => {
    setInputWord(word);
    setInputTranslation(translation);
    setIsForEdit(false);
  };

  const saveText = async (e) => {
    e.preventDefault();
    if (!inputWord || !inputTranslation) return;

    try {
      setIsLoading(true);
      const res = await fetch(
        `http://itgirlschool.justmakeit.ru/api/words/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            english: inputWord,
            russian: inputTranslation,
          }),
        }
      );
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

      const updatedWord = await res.json();
      updateWords(updatedWord); // Обновляем данные в родителе
      setIsForEdit(false);
    } catch (error) {
      console.error(`Ошибка сохранения: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const isSaveDisabled = !inputWord || !inputTranslation;

  return (
    <tr className="card">
      {isForEdit ? (
        <>
          <th>{index + 1}</th>
          <th>
            <input
              ref={wordInputRef}
              type="text"
              value={inputWord}
              placeholder="Введите слово"
              onChange={(e) => setInputWord(e.target.value)}
              className={!inputWord ? "error" : ""}
            />
          </th>
          <th>
            <input
              ref={translationInputRef}
              type="text"
              value={inputTranslation}
              placeholder="Введите перевод"
              onChange={(e) => setInputTranslation(e.target.value)}
              className={!inputTranslation ? "error" : ""}
            />
          </th>
          <th>
            <Button
              className="save-btn"
              text={isLoading ? "Saving..." : "Save"}
              onClick={saveText}
              disabled={isSaveDisabled || isLoading}
            />
            <Button className="cancel-btn" text="Cancel" onClick={cancelText} />
          </th>
        </>
      ) : (
        <>
          <th>{index + 1}</th>
          <th>{word}</th>
          <th>
            {hiddenTranslation ? (
              <Button
                className="show-btn"
                text="Показать перевод"
                onClick={handleHiddenTranslation}
              />
            ) : (
              <span>{translation}</span>
            )}
          </th>
          <th>
            <Button className="edit-btn" text="Edit" onClick={editText} />
            <Button
              className="delete-btn"
              text="Delete"
              onClick={() => deleteWord(id)}
            />
          </th>
        </>
      )}
    </tr>
  );
}

export default Card;
