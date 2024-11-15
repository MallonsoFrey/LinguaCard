import CardMinimalAll from "../CardMinimalAll/CardMinimalAll";
import WordTable from "../WordTable/WordTable";
import Home from "../Home/Home";
import { Routes, Route } from "react-router-dom";
import "./Main.scss";

function Main() {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table" element={<WordTable />} />
        <Route path="/cards" element={<CardMinimalAll />} />
      </Routes>
    </div>
  );
}

export default Main;

/*      <Home />
      <WordTable />
      <CardMinimalAll /> */
