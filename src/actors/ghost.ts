import Hero from "./hero";

interface GhostProps {
  x: number;
  y: number;
  speed: number;
}

const createGhost = ({ x, y }: Omit<GhostProps, "speed">) => {
  const ghost = document.createElement("div");
  ghost.style.position = "absolute";
  ghost.style.top = y + "px";
  ghost.style.left = x + "px";
  ghost.style.width = "45px";
  ghost.style.height = "54px";
  ghost.style.overflow = "hidden";
  ghost.style.backgroundImage = "url(/src/assets/images/enemy.png)";
  ghost.style.zIndex = "1";
  ghost.style.transform = "translateY(0)";

  return ghost;
};

export default class Ghost {
  private ghost: HTMLDivElement;
  private bg: HTMLDivElement;

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
    const interval = setInterval(() => {
      this.y += this.speed;
      this.ghost.style.transform = `translateY(${this.y}px)`;

      if (this.y >= 500) {
        clearInterval(interval);
      }
    }, 100);

    return this;
  }
}
