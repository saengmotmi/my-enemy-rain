import { Hero } from "../hero";
import { HERO_SPEED } from "../../config";
import game from "../../components/game";

export const initHero = () => {
  return new Hero(200, 500, HERO_SPEED, game);
};
