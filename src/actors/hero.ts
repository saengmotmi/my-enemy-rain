import { HERO_WIDTH } from "../config";

interface HeroProps {
  x: number;
  y: number;
  speed: number;
}

export class Hero {
  private hero: HTMLDivElement;
  private bg: HTMLDivElement;

  constructor(private x: number, private y: number, private speed: number) {
    // 인스턴스 생성
    this.hero = createHero({ x, y });
    this.bg = document.querySelector("#bg") || document.createElement("div");

    // 이벤트 리스너 생성
    document.addEventListener("keydown", (e) => this.move(e));
    document.addEventListener("keyup", () => {
      // Face up
      this.hero.style.backgroundPositionX = "0px";
    });
  }

  render() {
    this.bg.appendChild(this.hero);
    return this;
  }

  move(event: KeyboardEvent) {
    const direction = event.key;

    switch (direction) {
      case "ArrowLeft":
        this.x -= this.speed;
        this.hero.style.backgroundPositionX = `${HERO_WIDTH * 2}px`;
        break;

      case "ArrowRight":
        this.x += this.speed;
        this.hero.style.backgroundPositionX = `${HERO_WIDTH}px`;
        break;

      default:
        break;
    }
    this.hero.style.transform = `translateX(${this.x}px)`;

    return this.hero;
  }
}

const createHero = ({ x, y }: Omit<HeroProps, "speed">) => {
  const hero = document.createElement("div");
  hero.style.cssText = `
    position: absolute;
    top: ${y}px;
    width: ${HERO_WIDTH}px;
    height: 54px;
    overflow: hidden;
    background-image: url(/src/assets/images/hero.png);
    z-index: 2;
    transform: translateX(${x}px);
  `;
  return hero;
};
