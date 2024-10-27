/* eslint-disable react/prop-types */
import Button from "../Button/Button";
import "../Button/Button.scss";
import "./Card.scss";

function Card({ word, translation, index }) {
  return (
    <tr className="card">
      {word === "" || translation === "" ? (
        <>
          <th>{index + 1}</th>
          <th>
            <input
              type="text"
              name="text-word"
              id="text-word"
              placeholder="введите слово"
            />
          </th>
          <th>
            <input
              type="text"
              name="text-translation"
              id="text-translation"
              placeholder="введите перевод"
            />
          </th>
          <th>
            <Button className="edit-btn" text="Edit" />
            <Button className="delete-btn" text="Delete" />
          </th>
        </>
      ) : (
        <>
          <th>{index + 1}</th>
          <th>{word}</th>
          <th>{translation}</th>
          <th>
            <Button className="save-btn" text="Save" />
            <Button className="cancel-btn" text="Cancel" />
          </th>
        </>
      )}
    </tr>
  );
}

export default Card;
