import { Player } from "./Player.js";

export class Computer extends Player {
  #type = "computer";

  get type() {
    return this.#type;
  }

  attackRandomPlace(against) {
    let gameboard = against.gameboard;

    const directHits = [...gameboard.directHits]
      .map((cord) => JSON.parse(cord))
      .filter((cord) => !gameboard.board[cord[0]][cord[1]].isSunk());
    let lastHit = directHits.pop();

    while (lastHit) {
      if (gameboard.isValidAttack([lastHit[0], lastHit[1] + 1])) {
        return gameboard.receiveAttack([lastHit[0], lastHit[1] + 1]);
      } else if (gameboard.isValidAttack([lastHit[0], lastHit[1] - 1])) {
        return gameboard.receiveAttack([lastHit[0], lastHit[1] - 1]);
      } else if (gameboard.isValidAttack([lastHit[0] + 1, lastHit[1]])) {
        return gameboard.receiveAttack([lastHit[0] + 1, lastHit[1]]);
      } else if (gameboard.isValidAttack([lastHit[0] - 1, lastHit[1]])) {
        return gameboard.receiveAttack([lastHit[0] - 1, lastHit[1]]);
      } else {
        lastHit = directHits.pop();
      }
    }

    let move = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    while (!gameboard.isValidAttack(move)) {
      move = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    }
    gameboard.receiveAttack(move);
  }
}
