import { Hero } from "../actors";
import { HERO_SPEED } from "../config";

export const initHero = () => {
  return new Hero(200, 500, HERO_SPEED);
};
