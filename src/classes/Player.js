import { Gameboard } from "./Gameboard.js";
export class Player {
  #gameboard = new Gameboard();

  get gameboard() {
    return this.#gameboard;
  }
}
