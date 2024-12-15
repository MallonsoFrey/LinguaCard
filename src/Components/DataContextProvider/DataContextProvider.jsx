/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const DataContext = createContext();

function DataContextProvider({ children }) {
  const [words, setWords] = useState([]); // Состояние для слов
  const [error, setError] = useState(null); // Состояние для ошибки

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://itgirlschool.justmakeit.ru/api/words"
        );
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data = await response.json();
        setWords(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  // Отображаем компонент с ошибкой, если есть ошибка
  if (error) return <ErrorMessage message={error} />;

  return (
    <DataContext.Provider value={{ words, setWords }}>
      {children}
    </DataContext.Provider>
  );
}

export { DataContext, DataContextProvider };
