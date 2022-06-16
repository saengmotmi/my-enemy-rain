import { hero, Ghost } from "./actors";

export const BACKGROUND_WIDTH = 800;
export const GHOST_WIDTH = 45;
export const GHOSTS_PER_STAGE = 10;

const getGhostSpawnPosition = () => {
  return Math.random() * (BACKGROUND_WIDTH - GHOST_WIDTH);
};

const getGhostSpeed = () => {
  const MIN_SPEED = 5;
  const MAX_SPEED = 10;

  return Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED;
};

export const spawnGhosts = () => {
  const ghostArr = [...Array(GHOSTS_PER_STAGE)].map(() => ({
    x: getGhostSpawnPosition(),
    y: 0,
    speed: getGhostSpeed(),
  }));

  ghostArr
    .map(({ x, y, speed }) => new Ghost(x, y, speed, hero))
    .forEach((ghost) => ghost.render().start());
};
