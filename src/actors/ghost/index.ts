import { isCollision } from "./actions";
import { GHOST_WIDTH } from "../../config";
import { setStyleAttribute } from "../../utils";
import { Hero } from "../hero";
import { Game, StageSetting } from "../../components/game";

interface GhostProps {
  x: number;
  y: number;
  speed: number;
  hero: Hero;
  game: Game;
}

export class Ghost {
  public ghostDom: HTMLDivElement;
  private interval!: number | null;
  public status: "alive" | "dead" = "alive";

  constructor(
    public x: number,
    public y: number,
    private stageSetting: StageSetting,
    private hero: Hero,
    private game: Game
  ) {
    // 인스턴스 생성
    this.ghostDom = createGhost({ x, y });
    this.game.bg =
      document.querySelector("#bg") || document.createElement("div");
    this.game.ghosts.push(this);
  }

  render() {
    this.game.bg.appendChild(this.ghostDom);
    return this;
  }

  start() {
    this.interval = setInterval(() => {
      this.y += this.stageSetting.ghostSpeed;

      setStyleAttribute(this.ghostDom, {
        transform: `translateY(${this.y}px)`,
      });

      const isEndBorder = this.y >= 500;
      if (isEndBorder) {
        this.killed("end");
      }
      if (isCollision(this, this.hero)) {
        this.killed("hero");
      }
    }, 10);

    return this;
  }

  stop() {
    if (!this.interval) {
      return;
    }
    clearInterval(this.interval);
    this.interval = null;
    return this;
  }

  killed(reason: "end" | "hero") {
    this.stop();
    setStyleAttribute(this.ghostDom, {
      "background-position-x": `${GHOST_WIDTH}px`,
    }); // 사망 애니메이션

    switch (reason) {
      case "end":
        this.game.life.innerHTML = String(Number(this.game.life.innerHTML) - 1);
        break;
      case "hero":
        this.game.scoreBoard.innerHTML = String(
          Number(this.game.scoreBoard.innerHTML) + 1
        );
        break;
      default:
        break;
    }

    this.status = "dead";

    this.game.checkAllGhostsDead();

    return this;
  }
}

const createGhost = ({ x, y }: Pick<GhostProps, "x" | "y">) => {
  const ghost = document.createElement("div");
  ghost.className = "ghost";
  setStyleAttribute(ghost, {
    position: "absolute",
    left: `${x}px`,
    width: `${GHOST_WIDTH}px`,
    height: "54px",
    overflow: "hidden",
    "background-image": "url(/src/assets/images/enemy.png)",
    "z-index": "1",
    transform: `translateY(${y}px)`,
  });
  return ghost;
};
