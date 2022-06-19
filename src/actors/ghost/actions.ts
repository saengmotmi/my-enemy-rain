import { Ghost, Hero } from "../index";
import {
  BACKGROUND_WIDTH,
  GHOSTS_PER_STAGE,
  GHOST_WIDTH,
  HERO_HEIGHT,
  HERO_WIDTH,
} from "../../config";
import game from "../../components/game";

const getGhostSpawnPosition = () => {
  return Math.random() * (BACKGROUND_WIDTH - GHOST_WIDTH);
};

// const getGhostSpeed = () => {
//   const MIN_SPEED = 0.5;
//   const MAX_SPEED = 1;

//   return Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED;
// };

export const spawnGhosts = (hero: Hero) => {
  const ghostArr = [...Array(GHOSTS_PER_STAGE)].map(() => ({
    x: getGhostSpawnPosition(),
    y: 0,
  }));

  return ghostArr.map(
    ({ x, y }) =>
      new Ghost(x, y, game.stageSettings[game.stageIndex], hero, game)
  ); // 속도는 스테이지별로 바뀌게 할 것
};

export const startGhosts = (ghosts: Ghost[]) => {
  let count = 0;

  const interval = setInterval(() => {
    ghosts[count].render().start();
    count++;

    if (count === ghosts.length) {
      clearInterval(interval);
    }
  }, 2000);
};

export const isCollision = (ghost: Ghost, hero: Hero) => {
  const distanceYBetweenHero = hero.y - HERO_HEIGHT - ghost.y;
  const distanceXBetweenHero = Math.abs(hero.x - ghost.x) <= HERO_WIDTH; // 0 ~ 35
  return distanceYBetweenHero <= 0 && distanceXBetweenHero;
};
