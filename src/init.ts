import { initHero } from "./actors/hero/actions";
import game from "./components/game";
import "./style.scss";

export default function () {
  console.log("init");

  // 용사 초기화
  const hero = initHero();
  hero.render();

  game.startStage();
}
