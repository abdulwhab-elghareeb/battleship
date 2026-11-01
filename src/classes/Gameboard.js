import { Ship } from "./Ship.js";

export class Gameboard {
  // 10x10 board
  #board = [...new Array(10)].map(() => new Array(10).fill(0));
  #missedHits = new Set();
  #directHits = new Set();

  get board() {
    return this.#board;
  }

  get missedHits() {
    return this.#missedHits;
  }

  get directHits() {
    return this.#directHits;
  }

  placeShip(shipSize, [row, col]) {
    const ship = new Ship(shipSize);

    for (let i = 0; i < shipSize; i++) {
      this.#board[row][col + i] = ship;
    }
  }

  placeShips() {
    this.placeShip(5, [2, 1]);
    this.placeShip(4, [3, 2]);
    this.placeShip(3, [4, 3]);
    this.placeShip(3, [5, 4]);
    this.placeShip(2, [6, 5]);
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
