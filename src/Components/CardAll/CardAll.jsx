import Card from "../Card/Card";
import infos from "../../data/data.json";

export default function CardAll() {
  return (
    <>
      {infos.map(({ word, translation }, index) => (
        <Card index={index} key={index} word={word} translation={translation} />
      ))}
    </>
  );
}
