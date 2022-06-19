export default class Background {
  public dom: HTMLDivElement;

  constructor() {
    this.dom = document.querySelector("#bg") || document.createElement("div");
  }
}
