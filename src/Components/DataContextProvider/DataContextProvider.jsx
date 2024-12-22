/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const DataContext = createContext();

function DataContextProvider({ children }) {
  const [words, setWords] = useState([]); // Состояние для слов
  const [error, setError] = useState(null); // Состояние для ошибки
  const [dataChange, setDataChange] = useState(true);

  const serverDataChange = () => {
    setDataChange(!dataChange);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/words", { cache: "no-store" });
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
  }, [dataChange]);

  if (error) return <ErrorMessage message={error} />;

  return (
    <DataContext.Provider
      value={{ words, setWords, serverDataChange, dataChange }}
    >
      {children}
    </DataContext.Provider>
  );
}

export { DataContext, DataContextProvider };
