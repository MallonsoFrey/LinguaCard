import { Link } from "react-router-dom";

function MissingPage() {
  return (
    <div>
      <h1>OOPS! The page is not found 💀</h1>{" "}
      <p>
        You can go back to <Link to="/">learning</Link> though!
      </p>
    </div>
  );
}

export default MissingPage;
