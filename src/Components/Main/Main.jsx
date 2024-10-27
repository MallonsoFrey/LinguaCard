import CardAll from "../CardAll/CardAll";
import "./Main.scss";

function Main() {
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

export default Main;
