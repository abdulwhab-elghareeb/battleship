import { Ship } from "./Ship.js";

export class Gameboard {
  // 10x10 board
  #board = [...new Array(10)].map(() => new Array(10).fill(0));
  #missedHits = new Set();

  get board() {
    return this.#board;
  }

  get missedHits() {
    return this.#missedHits;
  }

  placeShip(shipSize, [x, y]) {
    const ship = new Ship(shipSize);

    for (let i = 0; i < shipSize; i++) {
      this.#board[y][x + i] = ship;
    }
  }

  receiveAttack([x, y]) {
    if (this.#missedHits.has([x, y].toString())) return;
    if (this.#board[y][x]) return this.#board[y][x].hit();
    this.#missedHits.add([x, y].toString());
  }

  areAllShipsSunk() {
    const allShips = this.#board.flat().filter((cord) => cord);

    for (const ship of allShips) {
      if (!ship.isSunk()) return false;
    }

    return true;
  }
}
