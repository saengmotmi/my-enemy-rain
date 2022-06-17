import { GHOST_WIDTH } from "../config";
import { Hero } from "./hero";

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
    private x: number,
    private y: number,
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
      this.ghost.style.transform = `translateY(${this.y}px)`;

      const isEndBoarder = this.y >= 500;
      // 피격판정 조건 추가 필요 - this.hero

      if (isEndBoarder) {
        this.killed("end");
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
    this.ghost.style.backgroundPositionX = `${GHOST_WIDTH}px`; // 사망 애니메이션
    return this;
  }
}

const createGhost = ({ x, y }: Omit<GhostProps, "speed">) => {
  const ghost = document.createElement("div");
  ghost.style.cssText = `
    position: absolute;
    left: ${x}px;
    width: ${GHOST_WIDTH}px;
    height: 54px;
    overflow: hidden;
    background-image: url(/src/assets/images/enemy.png);
    z-index: 1;
    transform: translateY(${y}px);
  `;
  return ghost;
};
