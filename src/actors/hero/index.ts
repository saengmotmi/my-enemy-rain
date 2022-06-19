import { Game } from "../../components/game";
import { HERO_WIDTH } from "../../config";
import { setStyleAttribute } from "../../utils";

interface HeroProps {
  x: number;
  y: number;
  speed: number;
  game: Game;
}

export class Hero {
  public heroDom: HTMLDivElement;

  constructor(
    public x: number,
    public y: number,
    private speed: number,
    private game: Game
  ) {
    // 인스턴스 생성
    this.heroDom = createHero({ x, y });
    this.game = game;
    this.game.hero = this;

    // 이벤트 리스너 생성
    document.addEventListener("keydown", (e) => this.move(e));
    document.addEventListener("keyup", () => {
      // Face up
      this.heroDom.style.backgroundPositionX = "0px";
    });
  }

  render() {
    this.game.bg.appendChild(this.heroDom);
    return this;
  }

  move(event: KeyboardEvent) {
    const direction = event.key;

    switch (direction) {
      case "ArrowLeft":
        this.x -= this.speed;
        setStyleAttribute(this.heroDom, {
          "background-position-x": `${HERO_WIDTH * 2}px`,
        });
        break;

      case "ArrowRight":
        this.x += this.speed;
        setStyleAttribute(this.heroDom, {
          "background-position-x": `${HERO_WIDTH}px`,
        });
        break;

      default:
        break;
    }
    setStyleAttribute(this.heroDom, {
      transform: `translateX(${this.x}px)`,
    });

    return this;
  }
}

const createHero = ({ x, y }: Pick<HeroProps, "x" | "y">) => {
  const hero = document.createElement("div");
  hero.id = "hero";
  setStyleAttribute(hero, {
    position: "absolute",
    top: `${y}px`,
    width: `${HERO_WIDTH}px`,
    height: "54px",
    overflow: "hidden",
    "background-image": "url(/src/assets/images/hero.png)",
    "z-index": "2",
    transform: `translateX(${x}px)`,
  });
  return hero;
};
