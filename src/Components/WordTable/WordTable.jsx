import CardAll from "../CardAll/CardAll";
import "./WordTable.scss";

function WordTable() {
  return (
    <>
      <table>
        <tr className="top-row">
          <th>#</th>
          <th>СЛОВО</th>
          <th>ПЕРЕВОД</th>
          <th></th>
        </tr>
        <CardAll />
      </table>
    </>
  );
}

export default WordTable;
