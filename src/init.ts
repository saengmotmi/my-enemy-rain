import { spawnGhosts, startGhosts } from "./actors/ghost/actions";
import { initHero } from "./actors/hero/actions";
import "./style.scss";

export default function () {
  console.log("init");

  // 용사 초기화
  const hero = initHero();
  hero.render();

  // 고스트 초기화
  const ghosts = spawnGhosts(hero);
  startGhosts(ghosts);
}
