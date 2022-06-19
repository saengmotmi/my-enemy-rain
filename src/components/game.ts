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

  constructor() {
    this.bg = document.querySelector("#bg") || document.createElement("div");
    this.scoreBoard =
      document.querySelector("#score_value") || document.createElement("div");
    this.life =
      document.querySelector("#life_value") || document.createElement("div");
    this.stageSettings = [
      {
        stage: 1,
        ghostSpeed: 0.5,
        ghostCount: 10,
        ghostSpawnInterval: 2000,
      },
    ];
  }
}

export default new Game();
