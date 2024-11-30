import CardMinimal from "../CardMinimal/CardMinimal";
import infos from "../../data/data.json";
import { useState } from "react";
import "./CardMinimalAll.scss";

function CardMinimalAll() {
  const [currentIndex, setCurrentIndex] = useState(0); // Для перелистывания карточек
  const [wordsLearned, setWordsLearned] = useState(0); // Для подсчета изученных слов
  const [hiddenTranslation, setHiddenTranslation] = useState(true); // Состояние для показа перевода

  // Обработчики для перелистывания карточек
  const handleNext = () => {
    setHiddenTranslation(true); // Скрываем перевод при смене карточки
    setCurrentIndex((prevIndex) =>
      prevIndex < infos.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrev = () => {
    setHiddenTranslation(true); // Скрываем перевод при смене карточки
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : infos.length - 1
    );
  };

  // Если массив не передан или пустой
  if (!infos || infos.length === 0) {
    return <div>Карточки отсутствуют</div>;
  }

  // Увеличение количества изученных слов
  const handleWordLearned = () => {
    if (hiddenTranslation) {
      // Увеличиваем счетчик только при первом нажатии на "Показать перевод"
      setWordsLearned((prevCount) => prevCount + 1);
    }
    setHiddenTranslation(false); // Показываем перевод
  };

  return (
    <div className="card-minimal-all__container">
      <div className="words-learned">Изучено слов: {wordsLearned}</div>
      <CardMinimal
        word={infos[currentIndex].word}
        translation={infos[currentIndex].translation}
        onNext={handleNext} // Обработчик для перехода к следующей карточке
        onPrev={handlePrev} // Обработчик для перехода к предыдущей карточке
        onLearn={handleWordLearned} // Увеличение счётчика изученных слов
      />
    </div>
  );
}

export default CardMinimalAll;
