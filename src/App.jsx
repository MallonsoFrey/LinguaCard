import Header from "./Components/Header/Header";
import Navigation from "./Components/Navigation/Navigation";
import Main from "./Components/Main/Main";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Header />
        <Navigation />
        <Main />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
