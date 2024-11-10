import CardMinimal from "../CardMinimal/CardMinimal";
import infos from "../../data/data.json";
import { useState } from "react";

function CardMinimalAll() {
  // Состояние для текущего индекса карточки
  const [currentIndex, setCurrentIndex] = useState(0);

  // Обработчики для перелистывания карточек
  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex < infos.length - 1 ? prevIndex + 1 : 0) // Вернуться в начало после последней карточки
    );
  };
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex > 0 ? prevIndex - 1 : infos.length - 1) // Перейти к последней карточке при листании назад с первой
    );
  };

  // Если массив не передан или пустой
  if (!infos || infos.length === 0) {
    return <div>Карточки отсутствуют</div>;
  }

  return (
    <CardMinimal
      word={infos[currentIndex].word}
      translation={infos[currentIndex].translation}
      onNext={handleNext}
      onPrev={handlePrev}
    />
  );
}

export default CardMinimalAll;
