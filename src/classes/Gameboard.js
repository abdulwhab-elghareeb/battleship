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
    const ship = new Ship(shipSize);

    for (let i = 0; i < shipSize; i++) {
      this.#board[row][col + i] = ship;
    }

    this.#shipCount++;
  }

  isValidPlacement(shipSize, [row, col]) {
    if (col + shipSize > 9 || row < 0 || col < 0) return false;

    for (let i = 0; i < shipSize; i++) {
      if (this.#board[row][col + i]) return false;
    }

    return true;
  }

  randomizeShips() {
    this.#board = [...new Array(10)].map(() => new Array(10).fill(0));
    this.#shipCount = 0;

    const sizes = [6, 4, 3, 3, 2];

    while (this.#shipCount !== 5) {
      const randomCord = [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      ];

      if (this.isValidPlacement(sizes[0], randomCord)) {
        this.placeShip(sizes.shift(), randomCord);
      }
    }
  }

  receiveAttack([row, col]) {
    if (!this.isValidAttack([row, col])) return;

    if (this.#board[row][col]) {
      this.#board[row][col].hit();
      this.#directHits.add(JSON.stringify([row, col]));
    } else {
      this.#missedHits.add(JSON.stringify([row, col]));
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
    const [row, col] = cord;
    return (
      !this.#missedHits.has(JSON.stringify(cord)) &&
      !this.#directHits.has(JSON.stringify(cord)) &&
      row >= 0 &&
      row <= 9 &&
      col >= 0 &&
      col <= 9
    );
  }
}
