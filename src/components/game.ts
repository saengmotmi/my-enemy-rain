import { Ghost } from "../actors/ghost";
import { spawnGhosts, startGhosts } from "../actors/ghost/actions";
import { Hero } from "../actors/hero";
import Background from "./background";
import Score from "./score";
import Stage from "./stage";

export interface StageSetting {
  stage: number;
  ghostSpeed: number;
  ghostCount: number;
  ghostSpawnInterval: number;
}

export class Game {
  public stage: Stage;
  public bg: Background;
  public score: Score;
  public ghosts: Ghost[] = [];
  public hero: Hero | null = null;
  public status: "ready" | "playing" | "gameOver" = "ready";

  constructor() {
    this.stage = new Stage();
    this.bg = new Background();
    this.score = new Score();
  }

  startStage() {
    this.status = "playing";
    this.stage.level++;
    this.stage.dom.innerHTML = String(this.stage.level);

    if (this.hero) {
      // 고스트 초기화
      const ghosts = spawnGhosts(this.hero);
      startGhosts(ghosts);
    }
  }

  endGame() {
    this.status = "gameOver";
    if (this.hero) {
      this.resetStage();
      this.hero.heroDom.remove();

      this.ghosts = [];
      this.hero = null;
    }
  }

  resetStage() {
    // TODO: 스테이지 초기화
    this.ghosts.forEach((ghost) => {
      ghost.stop();
      ghost.ghostDom.remove();
    });
    this.ghosts = [];
  }

  checkAllGhostsDead() {
    const isLifeRemain = Number(this.score.lifeDom.innerText) > 0;
    if (!isLifeRemain) {
      alert("게임 오버입니다.");
      this.endGame();
      // TODO: 게임오버 모달 출력
      return;
    }

    const isAllGhostsDead = this.ghosts.every(
      (ghost) => ghost.status === "dead"
    );
    if (isAllGhostsDead) {
      if (this.stage.level === this.stage.settings.length) {
        alert("모든 스테이지를 클리어하셨습니다!");
        return;
      }

      this.resetStage();
      alert("다음 스테이지로 넘어갑니다.");
      this.startStage();
      return;
    }
  }
}

export default new Game();
