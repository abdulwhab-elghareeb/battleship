import { Ship } from "./Ship.js";

export class Gameboard {
  // 10x10 board
  #board = [...new Array(10)].map(() => new Array(10).fill(0));
  #missedHits = new Set();
  #directHits = new Set();
  #shipCount = 0;

  get board() {
    return this.#board;
  }

  get missedHits() {
    return this.#missedHits;
  }

  get directHits() {
    return this.#directHits;
  }

  get shipCount() {
    return this.#shipCount;
  }

  placeShip(shipSize, [row, col]) {
    if (col + shipSize > 9) return;
    const ship = new Ship(shipSize);

    for (let i = 0; i < shipSize; i++) {
      if (this.#board[row][col + i]) return;
    }

    for (let i = 0; i < shipSize; i++) {
      this.#board[row][col + i] = ship;
    }

    this.#shipCount++;
  }

  randomizeShips() {
    this.#board = [...new Array(10)].map(() => new Array(10).fill(0));
    this.#shipCount = 0;

    const sizes = [6, 4, 3, 3, 2];
    let oldShipCount = this.#shipCount;

    while (this.#shipCount !== 5) {
      const randomCord = [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      ];

      this.placeShip(sizes[0], randomCord);

      if (this.#shipCount > oldShipCount) sizes.shift();
      oldShipCount = this.#shipCount;
    }
  }

  receiveAttack([row, col]) {
    if (!this.isValidAttack([row, col])) return;

    if (this.#board[row][col]) {
      this.#board[row][col].hit();
      this.#directHits.add([row, col].toString());
    } else {
      this.#missedHits.add([row, col].toString());
    }
  }

  areAllShipsSunk() {
    const allShips = this.#board.flat().filter((cord) => cord);

    for (const ship of allShips) {
      if (!ship.isSunk()) return false;
    }

    return true;
  }

  isValidAttack(cord) {
    return (
      !this.#missedHits.has(cord.toString()) &&
      !this.#directHits.has(cord.toString())
    );
  }
}
