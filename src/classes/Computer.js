import { Player } from "./Player.js";

export class Computer extends Player {
  #type = "CPU";

  get type() {
    return this.#type;
  }

  attackRandomPlace(against) {
    let gameboard = against.gameboard;

    const directHits = [...gameboard.directHits];
    let lastHit;
    if (directHits.length) {
      lastHit = JSON.parse(directHits.pop());
    }

    while (lastHit) {
      if (gameboard.isValidAttack([lastHit[0], lastHit[1] + 1])) {
        gameboard.receiveAttack([lastHit[0], lastHit[1] + 1]);
        return;
      } else if (gameboard.isValidAttack([lastHit[0], lastHit[1] - 1])) {
        gameboard.receiveAttack([lastHit[0], lastHit[1] - 1]);
        return;
      } else {
        lastHit = directHits.length ? JSON.parse(directHits.pop()) : undefined;
      }
    }

    let move = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    while (!gameboard.isValidAttack(move)) {
      move = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    }
    gameboard.receiveAttack(move);
  }
}
