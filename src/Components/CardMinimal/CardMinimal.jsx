/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import Button from "../Button/Button";
import "./CardMinimal.scss";

function CardMinimal({ word, translation, onNext, onPrev, onLearn }) {
  const [hiddenTranslation, setHiddenTranslation] = useState(true); // Состояние для показа перевода
  const showButtonRef = useRef(null); // Реф для кнопки "Посмотреть перевод"

  const isCardEmpty = !word.trim() || !translation.trim(); // Проверка на пустую карточку

  // Обработчик для показа перевода
  const handleHiddenTranslation = () => {
    if (hiddenTranslation) {
      // Увеличиваем счетчик изученных слов только при первом нажатии
      onLearn();
    }
    setHiddenTranslation(false); // Показываем перевод
  };

  // Устанавливаем фокус на кнопку "Посмотреть перевод" после рендера карточки
  useEffect(() => {
    setHiddenTranslation(true); // Сбрасываем перевод при смене карточки
    if (showButtonRef.current) {
      console.log("Фокус на кнопке устанавливается:", showButtonRef.current);
      showButtonRef.current.focus(); // Устанавливаем фокус
    }
  }, [word, translation]); // Срабатывает при изменении слова или перевода

  return (
    <div className="cardMinimal-container">
      <Button className="round" text={"<-"} onClick={onPrev} />
      <div className="cardMinimal">
        {isCardEmpty ? (
          <h2>Карточка отсутствует</h2>
        ) : (
          <>
            <h2>{word}</h2>
            {hiddenTranslation ? (
              <Button
                className="show-btn"
                text="Показать перевод"
                onClick={handleHiddenTranslation}
                ref={showButtonRef} // Добавляем реф к кнопке
              />
            ) : (
              <span>{translation}</span>
            )}
          </>
        )}
      </div>
      <Button className="round" text={"->"} onClick={onNext} />
    </div>
  );
}

export default CardMinimal;
