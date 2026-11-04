export const gameState = (() => {
  let player1;
  let player2;
  const setPlayer = (number, player) => {
    switch (number) {
      case 1:
        player1 = player;
        break;
      case 2:
        player2 = player;
    }
  };

  let isVertical = false;
  let player1Attacked = false;
  let player2Attacked = false;

  let playerTurn = 1;
  const swapTurns = () => (playerTurn = playerTurn === 1 ? 2 : 1);

  let mode = "Single";
  const setMode = (val) => {
    if (val === "Single" || val === "Multi") mode = val;
  };

  let phase = "NOT_STARTED";
  const nextPhase = () => {
    switch (phase) {
      case "NOT_STARTED":
        phase = "STARTED";
        break;
      case "STARTED":
        phase = "ENDED";
        break;
      case "ENDED":
        phase = "NOT_STARTED";
    }
  };

  const reset = () => {
    player1 = null;
    player2 = null;
    phase = "NOT_STARTED";
    mode = "";
    player1Attacked = false;
    player2Attacked = false;
    isVertical = false;
    playerTurn = 1;
  };

  return {
    get phase() {
      return phase;
    },
    get mode() {
      return mode;
    },
    get playerTurn() {
      return playerTurn;
    },
    get player1() {
      return player1;
    },
    get player2() {
      return player2;
    },
    player1Attacked,
    player2Attacked,
    isVertical,
    setPlayer,
    swapTurns,
    setMode,
    nextPhase,
    reset,
  };
})();
