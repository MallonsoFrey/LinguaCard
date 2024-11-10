import CardAll from "../CardAll/CardAll";
import CardMinimalAll from "../CardMinimalAll/CardMinimalAll";
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
      <CardMinimalAll />
    </>
  );
}

export default Main;
