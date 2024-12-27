/* eslint-disable react/prop-types */
import { useState, useRef, useContext } from "react";
import Button from "../Button/Button";
import "../Button/Button.scss";
import "./Card.scss";
import { DataContext } from "../DataContextProvider/DataContextProvider";

function Card({ word, translation, index, id, deleteWord, transcription }) {
  const { serverDataChange } = useContext(DataContext); //функция изменения флага для обращения на сервер
  const [hiddenTranslation, setHiddenTranslation] = useState(true); //состояние показа перевода слова
  const [isForEdit, setIsForEdit] = useState(false); //состояние редактирования слова
  const [inputWord, setInputWord] = useState(word); //состояние ввода слова в инпуте, начальное приходит из объекта с сервера
  const [inputTranslation, setInputTranslation] = useState(translation); //состояние ввода перевода в инпуте, начальное приходит из объекта с сервера
  const [inputTranscription, setInputTranscription] = useState(transcription); //состояние ввода транскрипции
  const [isLoading, setIsLoading] = useState(false); //состояние загрузки

  const wordInputRef = useRef(null); //реф для инпута ввода слова
  const translationInputRef = useRef(null); //реф для инпута ввода перевода

  const handleHiddenTranslation = () =>
    //изменяет состояние показа перевода на противоположное
    setHiddenTranslation(!hiddenTranslation);

  const editText = () => setIsForEdit(true); //режим редактирования, при isForEdit true выходят инпуты с начальными словами для редактирования

  const cancelText = () => {
    //отменить редактирование
    setInputWord(word); //возвращаем изначальное слово из состояния
    setInputTranscription(transcription);
    setInputTranslation(translation); //возвращаем изначальный перевод из состояния
    setIsForEdit(false); //состояние редактирования в false, закрываем режим
  };

  //слово редактируется по одиночке, поэтому локально
  const saveText = async (e) => {
    e.preventDefault();
    if (!inputWord || !inputTranslation) return; //если нет слова или перевода, прекращаем код

    console.log(
      `ID: ${id}, english:${inputWord}, transcription:${inputTranscription}, russian:${inputTranslation}`
    );
    try {
      setIsLoading(true); //показывем визуально что сохранение началось
      const res = await fetch(`/api/words/${id}/update`, {
        //делаем запрос
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          english: inputWord,
          transcription: inputTranscription,
          russian: inputTranslation,
          tags: "",
          tags_json: "[]",
        }),
      });
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`); //если не удалось выполнить запрос на сервер и отправить данные, то выдаем ошибку

      const updatedWord = await res.json(); //если удалось, то преобразуем ответ сервера в json
      if (updatedWord) {
        //если ответ есть
        serverDataChange(); //меняем флаг в элементе контекста, чтобы локально слова тоже поменялись
      }
      setIsForEdit(false); //отключаем режим редактирования после изменения полей ввода
    } catch (error) {
      console.error(`Ошибка сохранения: ${error.message}`);
    } finally {
      setIsLoading(false); //в конце в любом случае меняем состояние загрузки в false
    }
  };

  const isSaveDisabled = !inputWord || !inputTranslation;

  return (
    <tr className="card">
      {isForEdit ? ( //режим редактирования включен?
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
              type="text"
              value={inputTranscription}
              placeholder="Введите слово"
              onChange={(e) => setInputTranscription(e.target.value)}
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
            <Button /*кнопка сохранения слова*/
              className="save-btn"
              text={isLoading ? "Saving..." : "Save"} //если идёт загрузка, то показыаем другой текст на кнопке
              onClick={saveText}
              disabled={isSaveDisabled || isLoading} //отключаем кнопку, если нет данных в поле ввода ИЛИ в переводе ИЛИ идёт загрузка
            />
            <Button
              className="cancel-btn"
              text="Cancel"
              onClick={cancelText} /*кнопка отмены редактирования*/
            />
          </th>
        </>
      ) : (
        //если режим редактирования выключен
        <>
          <th>{index + 1}</th>
          <th>{word /*показываем слово с сервера*/}</th>
          <th>{transcription}</th>
          <th>
            {hiddenTranslation ? ( // ЕСЛИ состояние показа перевода в true, то показыаем кнопку "показать перевод"
              <Button
                className="show-btn"
                text="Показать перевод"
                onClick={handleHiddenTranslation}
              />
            ) : (
              // ЕСЛИ в состояние показа перевода в false, то выводим перевод с сервера
              <span>{translation}</span> //показываем перевод
            )}
          </th>
          <th>
            <Button
              className="edit-btn"
              text="Edit"
              onClick={editText} /*кнопка редактировния слова*/
            />
            <Button
              className="delete-btn"
              text="Delete"
              onClick={() => deleteWord(id)}
              /*кнопка удаления слова*/
            />
          </th>
        </>
      )}
    </tr>
  );
}

export default Card;
