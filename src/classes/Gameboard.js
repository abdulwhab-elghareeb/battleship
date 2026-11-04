import { getDifferences } from "../helpers/arrayHelpers.js";
import { Ship } from "./Ship.js";

export class Gameboard {
  // 10x10 board
  #board = [...new Array(10)].map(() => new Array(10).fill(0));
  #missedHits = new Set();
  #directHits = new Set();
  #shipCount = 0;
  #currentShipSizes = [];

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

  get currentShipSizes() {
    return this.#currentShipSizes;
  }

  placeShip(shipSize, [row, col], isVertical = false) {
    let cords = [];
    if (isVertical) {
      for (let i = 0; i < shipSize; i++) {
        if (row + i > 9 || this.#board[row + i][col]) {
          cords = [];
          break;
        }
        cords.push([row + i, col]);
      }

      if (!cords.length) {
        for (let i = 0; i < shipSize; i++) {
          if (row - i < 0 || this.#board[row - i][col]) {
            cords = [];
            break;
          }
          cords.push([row - i, col]);
        }
      }
    } else {
      for (let i = 0; i < shipSize; i++) {
        if (col + i > 9 || this.#board[row][col + i]) {
          cords = [];
          break;
        }
        cords.push([row, col + i]);
      }

      if (!cords.length) {
        for (let i = 0; i < shipSize; i++) {
          if (col - i < 0 || this.#board[row][col - i]) {
            cords = [];
            break;
          }
          cords.push([row, col - i]);
        }
      }
    }

    if (cords.length) {
      const ship = new Ship(shipSize);
      cords.forEach((cord) => {
        this.#board[cord[0]][cord[1]] = ship;
      });
      this.#shipCount++;
      this.#currentShipSizes.push(shipSize);
      return;
    }
  }

  randomizeShips() {
    this.createNewBoard();

    while (this.#shipCount !== 5) {
      const sizes = getDifferences([5, 4, 3, 3, 2], this.#currentShipSizes);
      const randomCord = [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      ];
      const vertical = Math.floor(Math.random() * 2) === 0 ? false : true;

      this.placeShip(sizes.shift(), randomCord, vertical);
    }
  }

  createNewBoard() {
    this.#board = [...new Array(10)].map(() => new Array(10).fill(0));
    this.#shipCount = 0;
    this.#directHits = new Set();
    this.#missedHits = new Set();
    this.#currentShipSizes = [];
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
