export class Ship {
  #length;
  #hitCounter = 0;
  constructor(length = 0) {
    this.#length = length;
  }

  hit() {
    this.#hitCounter++;
  }

  isSunk() {
    return this.#hitCounter >= this.#length;
  }
}
