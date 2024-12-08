/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import Button from "../Button/Button";
import "../Button/Button.scss";
import "./Card.scss";

function Card({ word, translation, index }) {
  const [hiddenTranslation, setHiddenTranslation] = useState(true);
  const [isForEdit, setIsForEdit] = useState(false);
  const [inputWord, setInputWord] = useState(word);
  const [inputTranslation, setInputTranslation] = useState(translation);

  const wordInputRef = useRef(null);
  const translationInputRef = useRef(null);

  const handleHiddenTranslation = () => {
    setHiddenTranslation(!hiddenTranslation);
  };

  const editText = () => {
    setIsForEdit(true); // Переход в режим редактирования
  };

  const saveText = () => {
    if (!inputWord || !inputTranslation) {
      return; // Остановка сохранения, если хотя бы одно поле пустое
    }
    console.log("Сохраненные данные:", { inputWord, inputTranslation });
    setIsForEdit(false); // Закрыть режим редактирования
  };

  const cancelText = () => {
    setInputWord(word); // Сбрасываем значения на исходные
    setInputTranslation(translation);
    setIsForEdit(false); // Выход из режима редактирования
  };

  // Эффект для установки фокуса на кнопку "Показать перевод"
  useEffect(() => {
    if (!hiddenTranslation && wordInputRef.current) {
      wordInputRef.current.focus();
    }
  }, [hiddenTranslation]);

  // Проверка на пустые поля для блокировки кнопки
  const isSaveDisabled = !inputWord || !inputTranslation;

  // Устанавливаем класс "error" для пустых полей
  const getInputClass = (inputValue) => (inputValue ? "" : "error");

  return (
    <tr className="card">
      {/* Если поле пустое, то отображаем поля для редактирования */}
      {word === "" || translation === "" || isForEdit ? (
        <>
          <th>{index + 1}</th>
          <th>
            <input
              ref={wordInputRef}
              type="text"
              name="text-word"
              id="text-word"
              placeholder="введите слово"
              value={inputWord}
              onChange={(e) => setInputWord(e.target.value)}
              className={getInputClass(inputWord)} // Применяем класс для пустого поля
            />
          </th>
          <th>
            <input
              ref={translationInputRef}
              type="text"
              name="text-translation"
              id="text-translation"
              placeholder="введите перевод"
              value={inputTranslation}
              onChange={(e) => setInputTranslation(e.target.value)}
              className={getInputClass(inputTranslation)} // Применяем класс для пустого поля
            />
          </th>
          <th>
            <Button
              className="save-btn"
              text="Save"
              onClick={saveText}
              disabled={isSaveDisabled} // Блокировка кнопки, если хотя бы одно поле пустое
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
            <Button className="delete-btn" text="Delete" />
          </th>
        </>
      )}
    </tr>
  );
}

export default Card;
