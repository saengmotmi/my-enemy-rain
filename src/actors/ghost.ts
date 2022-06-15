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
    console.log(this.bg, this.ghost);
    this.bg.appendChild(this.ghost);
  }
}
