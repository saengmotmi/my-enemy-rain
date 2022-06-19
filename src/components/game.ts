import { Ghost } from "../actors/ghost";
import { spawnGhosts, startGhosts } from "../actors/ghost/actions";
import { Hero } from "../actors/hero";
import { stageSettings } from "../config";

export interface StageSetting {
  stage: number;
  ghostSpeed: number;
  ghostCount: number;
  ghostSpawnInterval: number;
}

export class Game {
  public bg: HTMLDivElement;
  public scoreBoard: HTMLDivElement;
  public life: HTMLDivElement;
  public stageSettings: StageSetting[];
  public stageIndex: number = 0;
  public ghosts: Ghost[] = [];
  public hero: Hero | null = null;

  constructor() {
    this.bg = document.querySelector("#bg") || document.createElement("div");
    this.scoreBoard =
      document.querySelector("#score_value") || document.createElement("div");
    this.life =
      document.querySelector("#life_value") || document.createElement("div");
    this.stageSettings = stageSettings;
  }

  startStage() {
    if (this.hero) {
      // 고스트 초기화
      const ghosts = spawnGhosts(this.hero);
      startGhosts(ghosts);
    }
  }

  endGame() {
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
    const isLifeRemain = Number(this.life.innerText) > 0;
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
      this.stageIndex++;

      if (this.stageIndex === this.stageSettings.length) {
        alert("모든 스테이지를 클리어하셨습니다!");
        return;
      }

      alert("다음 스테이지로 넘어갑니다.");

      this.resetStage();
      this.startStage();
      return;
    }
  }
}

export default new Game();
