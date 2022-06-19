import { isCollision } from "./actions";
import { GHOST_WIDTH } from "../../config";
import { setStyleAttribute } from "../../utils";
import { Hero } from "../hero";

interface GhostProps {
  x: number;
  y: number;
  speed: number;
}

export class Ghost {
  private ghost: HTMLDivElement;
  private bg: HTMLDivElement;
  private interval!: number | null;

  constructor(
    public x: number,
    public y: number,
    private speed: number,
    private hero: Hero
  ) {
    // 인스턴스 생성
    this.ghost = createGhost({ x, y });
    this.bg = document.querySelector("#bg") || document.createElement("div");
  }

  render() {
    this.bg.appendChild(this.ghost);
    return this;
  }

  start() {
    this.interval = setInterval(() => {
      this.y += this.speed;

      setStyleAttribute(this.ghost, {
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

    setStyleAttribute(this.ghost, {
      "background-position-x": `${GHOST_WIDTH}px`,
    }); // 사망 애니메이션

    console.log(reason);

    return this;
  }
}

const createGhost = ({ x, y }: Omit<GhostProps, "speed">) => {
  const ghost = document.createElement("div");
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