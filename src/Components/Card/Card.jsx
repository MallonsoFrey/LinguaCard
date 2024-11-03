/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "../Button/Button";
import "../Button/Button.scss";
import "./Card.scss";

function Card({ word, translation, index }) {
  const [hiddenTranslation, setHiddenTranslation] = useState(true); //Состояние для показа перевода
  const [isForEdit, setIsForEdit] = useState(false); //Состояние для редактирования слова
  const [inputWord, setInputWord] = useState(word); // Состояние для слова
  const [inputTranslation, setInputTranslation] = useState(translation); //Состояние для перевода

  const handleHiddenTranslation = () => {
    setHiddenTranslation(!hiddenTranslation);
  };

  const editText = () => {
    setIsForEdit(!isForEdit);
    if (isForEdit) {
      // Если выходить из режима редактирования, то состояние слова и перевода обновляются
      setInputWord(word);
      setInputTranslation(translation);
    }
  };

  const cancelText = () => {
    setInputWord(word); // Значение поля слова сбрасывается на исходное
    setInputTranslation(translation); // Значение поля перевода сбрасывается на исходное
    setIsForEdit(false); // Возврат из режима редактирования
  };

  return (
    <tr className="card">
      {word === "" || translation === "" ? (
        <>
          <th>{index + 1}</th>
          <th>
            <input
              type="text"
              name="text-word"
              id="text-word"
              placeholder="введите слово"
              value={inputWord} // Используется состояние слова
              onChange={(e) => setInputWord(e.target.value)} // Состояние при вводе обновляется
            />
          </th>
          <th>
            <input
              type="text"
              name="text-translation"
              id="text-translation"
              placeholder="введите перевод"
              value={inputTranslation} // Используется состояние перевода
              onChange={(e) => setInputTranslation(e.target.value)} // Состояние при вводе обновляется
            />
          </th>
          <th>
            <Button className="save-btn" text="Save" />
            <Button className="cancel-btn" text="Cancel" onClick={cancelText} />
          </th>
        </>
      ) : (
        <>
          <th>{index + 1}</th>
          {isForEdit ? (
            <>
              <th>
                <input
                  type="text"
                  name="text-word"
                  id="text-word"
                  value={inputWord} // Используется состояние слова
                  onChange={(e) => setInputWord(e.target.value)} // Состояние при вводе обновляется
                />
              </th>
              <th>
                <input
                  type="text"
                  name="text-translation"
                  id="text-translation"
                  value={inputTranslation} // Используется состояние перевода
                  onChange={(e) => setInputTranslation(e.target.value)} // Состояние при вводе обновляется
                />
              </th>
            </>
          ) : (
            <>
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
            </>
          )}
          <th>
            <Button className="edit-btn" text="Edit" onClick={editText} />
            <Button className="delete-btn" text="Delete" />
          </th>
        </>
      )}
    </tr>
  );
}

export default Card;
