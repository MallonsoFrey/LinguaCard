import { makeAutoObservable } from "mobx";

class DataMobXContext {
  words = [];
  error = null;

  constructor() {
    makeAutoObservable(this);
    this.fetchData();
  }

  async fetchData() {
    try {
      const response = await fetch("/api/words", { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      const data = await response.json();
      this.words = data;
    } catch (err) {
      this.error = err.message;
    }
  }

  async addToServer(data) {
    this.isLoading = false;

    if (!data.english || !data.russian) return;
    this.isLoading = true; //HERE????????????

    try {
      const res = await fetch("/api/words/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(`HTTP error occured: ${res.status}`);
      const addedWord = await res.json(); //если удалось, то преобразуем ответ сервера в json
      if (addedWord) {
        console.log(addedWord);
        this.fetchData;
      }
    } catch (err) {
      console.log(err);
    } finally {
      this.isLoading = false;
    }
  }

  async saveText(data, id, setIsForEdit) {
    const { inputWord, inputTranslation, inputTranscription } = data;
    this.isLoading = false;

    if (!inputWord || !inputTranslation) return; //если нет слова или перевода, прекращаем код

    try {
      this.isLoading = true; //показывем визуально что сохранение началось
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
        this.fetchData(); //меняем флаг в элементе контекста, чтобы локально слова тоже поменялись
      }
      setIsForEdit(false); //отключаем режим редактирования после изменения полей ввода
    } catch (error) {
      console.error(`Ошибка сохранения: ${error.message}`);
    } finally {
      this.isLoading = false; //в конце в любом случае меняем состояние загрузки в false
    }
  }

  async deleteWord(id) {
    try {
      const res = await fetch(`/api/words/${id}/delete`, {
        method: "POST",
      });
      if (!res.ok) throw new Error(`Ошибка при удалении: ${res.status}`);

      const updatedList = await res.json(); //если удалось, то преобразуем ответ сервера в json
      if (updatedList) {
        //если ответ есть
        this.fetchData(); //меняем флаг в элементе контекста, чтобы локально слова тоже поменялись
      }
    } catch (err) {
      console.log("Ошибка удаления:", err.message);
      this.error = err.message;
    }
  }
}

export const dataMobXContext = new DataMobXContext();
