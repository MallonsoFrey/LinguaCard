/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "../Button/Button";
import "../Button/Button.scss";
import "./Card.scss";
import { dataMobXContext } from "../DataMobXContext/DataMobXContext";

function Card({ word, transcription, translation, id, index }) {
  const [hiddenTranslation, setHiddenTranslation] = useState(true); //состояние показа перевода слова
  const [isForEdit, setIsForEdit] = useState(false); //состояние редактирования слова
  const [state, setState] = useState({
    //состояние для полей ввода
    inputWord: word,
    inputTranslation: translation,
    inputTranscription: transcription,
  });

  const handleChange = (e) => {
    //изменение состояния для полей ввода
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const editText = () => setIsForEdit(true); //режим редактирования, при isForEdit true выходят инпуты с начальными словами для редактирования

  const cancelText = () => {
    setState({
      inputWord: word, // возвращаем исходное значение для inputWord
      inputTranslation: translation, // возвращаем исходное значение для inputTranslation
      inputTranscription: transcription, // возвращаем исходное значение для inputTranscription
    });
    setIsForEdit(false); // отключаем режим редактирования
  };

  const isSaveDisabled = !state.inputWord || !state.inputTranslation;

  return (
    <tr className="card">
      {isForEdit ? ( //режим редактирования включен?
        <>
          <th>{index + 1}</th>
          <th>
            <input
              type="text"
              name="inputWord"
              value={state.inputWord}
              placeholder="Введите слово"
              onChange={handleChange}
              className={!state.inputWord ? "error" : ""}
            />
          </th>
          <th>
            <input
              type="text"
              name="inputTranscription"
              value={state.inputTranscription}
              placeholder="Введите слово"
              onChange={handleChange}
            />
          </th>
          <th>
            <input
              type="text"
              name="inputTranslation"
              value={state.inputTranslation}
              placeholder="Введите перевод"
              onChange={handleChange}
              className={!state.inputTranslation ? "error" : ""}
            />
          </th>
          <th>
            <Button /*кнопка сохранения слова*/
              className="save-btn"
              text={dataMobXContext.isLoading ? "Saving..." : "Save"} //если идёт загрузка, то показыаем другой текст на кнопке
              onClick={() => dataMobXContext.saveText(state, id, setIsForEdit)}
              disabled={isSaveDisabled || dataMobXContext.isLoading} //отключаем кнопку, если нет данных в поле ввода ИЛИ в переводе ИЛИ идёт загрузка
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
                onClick={() => setHiddenTranslation(!hiddenTranslation)}
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
              onClick={() => dataMobXContext.deleteWord(id)}
              /*кнопка удаления слова*/
            />
          </th>
        </>
      )}
    </tr>
  );
}

export default Card;
