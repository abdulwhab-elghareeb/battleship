import { Player } from "./Player";

export class Computer extends Player {
  #type = "CPU";

  get type() {
    return this.#type;
  }

  attackRandomPlace(against) {
    let gameboard = against.gameboard;
    let move = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    while (
      gameboard.missedHits.has(move.toString()) ||
      gameboard.directHits.has(move.toString())
    ) {
      move = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    }

    gameboard.receiveAttack(move);
  }
}
