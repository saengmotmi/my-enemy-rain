import { stageSettings } from "../config";
import { StageSetting } from "./game";

export default class Stage {
  public dom: HTMLDivElement;
  public settings: StageSetting[] = stageSettings;
  public level: number = 0;

  constructor() {
    this.dom =
      document.querySelector("#stage_value") || document.createElement("div");
  }
}
