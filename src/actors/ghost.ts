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

      if (this.y >= 500) {
        this.killed();
      }
    }, 100);

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

  killed() {
    this.stop();
    this.ghost.style.backgroundPositionX = "45px"; // 사망 애니메이션
    return this;
  }
}

const createGhost = ({ x, y }: Omit<GhostProps, "speed">) => {
  const ghost = document.createElement("div");
  ghost.style.cssText = `
    position: absolute;
    top: ${y}px;
    left: ${x}px;
    width: 45px;
    height: 54px;
    overflow: hidden;
    background-image: url(/src/assets/images/enemy.png);
    z-index: 1;
    transform: translateY(0);
  `;
  return ghost;
};
