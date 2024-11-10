/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "../Button/Button";
import "./CardMinimal.scss";

function CardMinimal({ word, translation, onNext, onPrev }) {
  const [hiddenTranslation, setHiddenTranslation] = useState(true); //Состояние для показа перевода

  const handleHiddenTranslation = () => {
    setHiddenTranslation(!hiddenTranslation);
  };

  const isCardEmpty = !word.trim() || !translation.trim();

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
