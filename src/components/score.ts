export default class Score {
  public scoreDom: HTMLDivElement;
  public lifeDom: HTMLDivElement;

  constructor() {
    this.scoreDom =
      document.querySelector("#score_value") || document.createElement("div");
    this.lifeDom =
      document.querySelector("#life_value") || document.createElement("div");
  }
}
