import { Link } from "react-router-dom";
import "./Navigation.scss";

function Navigation() {
  return (
    <>
      <nav className="nav">
        <ul className="list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/table">Word List</Link>
          </li>
          <li>
            <Link to="/cards">Learning Cards</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navigation;
