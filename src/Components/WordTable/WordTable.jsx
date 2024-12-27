import CardAll from "../CardAll/CardAll";
import "./WordTable.scss";
import AddWord from "../Services/addWord/addWord.jsx";

function WordTable() {
  return (
    <div className="table-container">
      <table>
        <tr className="top-row">
          <th>#</th>
          <th>СЛОВО</th>
          <th>ТАНСКРИПЦИЯ</th>
          <th>ПЕРЕВОД</th>
          <th></th>
        </tr>
        <CardAll />
      </table>
      <AddWord />
    </div>
  );
}

export default WordTable;
