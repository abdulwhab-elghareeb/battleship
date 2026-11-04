export class GameState {
  #mode;
  #phase = "notStarted";
  #player1;
  #player2;
  #currentTurn = 1;
  #didPlayer1Attack = false;
  #didPlayer2Attack = false;

  get mode() {
    return this.#mode;
  }
  setMode(val) {
    if (val === "single" || val === "multi") {
      this.#mode = val;
    }
  }

  get phase() {
    return this.#phase;
  }
  toNextPhase() {
    let newPhase = "";
    switch (this.#phase) {
      case "notStarted":
        newPhase = "started";
        break;
      case "started":
        newPhase = "ended";
        break;
      case "ended":
        newPhase = "notStarted";
    }
    this.#phase = newPhase;
  }

  get player1() {
    return this.#player1;
  }
  get player2() {
    return this.#player2;
  }
  setPlayer1(val) {
    this.#player1 = val;
  }
  setPlayer2(val) {
    this.#player2 = val;
  }

  get currentTurn() {
    return this.#currentTurn;
  }
  swapTurns() {
    this.#currentTurn = this.#currentTurn === 1 ? 2 : 1;
  }

  get didPlayer1Attack() {
    return this.#didPlayer1Attack;
  }
  get didPlayer2Attack() {
    return this.#didPlayer2Attack;
  }
  setPlayer1AsAttacked() {
    this.#didPlayer1Attack = true;
    this.#didPlayer2Attack = false;
  }
  setPlayer2AsAttacked() {
    this.#didPlayer2Attack = true;
    this.#didPlayer1Attack = false;
  }
}

export let gameState = new GameState();
export function createNewState() {
  gameState = new GameState();
}
