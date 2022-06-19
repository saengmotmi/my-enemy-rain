import { Ghost, Hero } from "../actors";
import {
  BACKGROUND_WIDTH,
  GHOSTS_PER_STAGE,
  GHOST_WIDTH,
  HERO_HEIGHT,
  HERO_WIDTH,
} from "../config";

const getGhostSpawnPosition = () => {
  return Math.random() * (BACKGROUND_WIDTH - GHOST_WIDTH);
};

const getGhostSpeed = () => {
  const MIN_SPEED = 0.5;
  const MAX_SPEED = 1;

  return Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED;
};

export const spawnGhosts = (hero: Hero) => {
  const ghostArr = [...Array(GHOSTS_PER_STAGE)].map(() => ({
    x: getGhostSpawnPosition(),
    y: 0,
    speed: getGhostSpeed(),
  }));

  return ghostArr
    .map(({ x, y, speed }) => new Ghost(x, y, speed, hero))
    .map((ghost) => ghost.render());
};

export const startGhosts = (ghosts: Ghost[]) => {
  return ghosts.map((ghost) => ghost.start());
};

export const isCollision = (ghost: Ghost, hero: Hero) => {
  const distanceYBetweenHero = hero.y - HERO_HEIGHT - ghost.y;
  const distanceXBetweenHero = Math.abs(hero.x - ghost.x) <= HERO_WIDTH; // 0 ~ 35
  return distanceYBetweenHero <= 0 && distanceXBetweenHero;
};
