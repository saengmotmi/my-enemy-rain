import Ghost from "./actors/ghost";
import Hero from "./actors/hero";
import "./style.scss";

const hero = new Hero();

export default function () {
  console.log("init");

  const arr = [
    { x: 0, y: 0, speed: 1 },
    { x: 200, y: 0, speed: 2 },
    { x: 400, y: 0, speed: 3 },
    { x: 600, y: 0, speed: 4 },
  ];

  arr
    .map(({ x, y, speed }) => new Ghost(x, y, speed, hero))
    .forEach((ghost) => ghost.render().start());
}
