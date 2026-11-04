import { Player } from "./Player.js";

export class Human extends Player {
  #type = "human";

  get type() {
    return this.#type;
  }

  attackPlace([row, col], againstPlayer) {
    againstPlayer.gameboard.receiveAttack([row, col]);
  }
}
