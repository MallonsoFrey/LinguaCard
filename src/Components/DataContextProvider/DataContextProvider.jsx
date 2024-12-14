/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

const DataContext = createContext();

function DataContextProvider({ children }) {
  const [words, setWords] = useState([]);

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
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ words, setWords }}>
      {children}
    </DataContext.Provider>
  );
}

export { DataContext, DataContextProvider };
