import { Gameboard } from "./Gameboard.js";
export class Player {
  #type;
  #gameboard = new Gameboard();
  constructor(type) {
    this.#type = type === "Player" || type === "CPU" ? type : "Player";
  }

  get type() {
    return this.#type;
  }

  get gameboard() {
    return this.#gameboard;
  }
}
