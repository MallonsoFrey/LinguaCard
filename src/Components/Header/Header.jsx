import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import "./Header.scss";

function Header() {
  return (
    <>
      <header className="header">
        <Link to="/">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        </Link>
        <p>Let&apos;s learn new words!</p>
      </header>
    </>
  );
}

export default Header;
