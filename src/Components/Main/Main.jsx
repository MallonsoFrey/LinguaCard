import CardMinimalAll from "../CardMinimalAll/CardMinimalAll";
import WordTable from "../WordTable/WordTable";
import MissingPage from "../MissingPage/MissingPage";
import { Routes, Route } from "react-router-dom";
import { DataContextProvider } from "../DataContextProvider/DataContextProvider";
import "./Main.scss";

function Main() {
  return (
    <DataContextProvider>
      <div className="main">
        <Routes>
          <Route path="/" element={<WordTable />} />
          <Route path="/cards" element={<CardMinimalAll />} />
          <Route path="*" element={<MissingPage />} />
        </Routes>
      </div>
    </DataContextProvider>
  );
}

export default Main;
