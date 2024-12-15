/* eslint-disable react/prop-types */
import error from "../../assets/error.svg";
import "./ErrorMessage.scss";

function ErrorMessage({ message }) {
  return (
    <div className="error-container">
      <h2>Oops! There is an error: {message}</h2>{" "}
      <p>Please refresh the page or try later</p>
      <div className="error-img">
        <img src={error} alt="error" />
      </div>
    </div>
  );
}

export default ErrorMessage;
