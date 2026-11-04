import { receiveAttack } from "../handlers/attackHandler.js";
import { createDOMElement } from "../helpers/domHelpers.js";
import { applyDragAndDrop } from "../handlers/shipPlacingHandlers.js";
import { gameState } from "../classes/GameState.js";

export function renderBoard(playerNumber) {
  document.querySelector(`.player${playerNumber} .board`)?.remove();

  const player = playerNumber === 1 ? gameState.player1 : gameState.player2;
  const isPlayerTurn = gameState.currentTurn === playerNumber;
  const againstPlayerAttacked =
    playerNumber === 1
      ? gameState.didPlayer2Attack
      : gameState.didPlayer1Attack;

  const gridContainer = createDOMElement({
    elemType: "div",
    class: "board",
  });
  document.querySelector(`.player${playerNumber} h1`).after(gridContainer);

  switch (gameState.phase) {
    case "started":
      if (player.type === "computer") {
        gridContainer.addEventListener("click", (e) =>
          receiveAttack(e, playerNumber),
        );
      } else {
        if (
          gameState.mode === "multi" &&
          !againstPlayerAttacked &&
          !isPlayerTurn
        ) {
          gridContainer.addEventListener("click", (e) =>
            receiveAttack(e, playerNumber),
          );
        }
      }
      break;

    case "notStarted":
      if (player.type === "human") {
        applyDragAndDrop(playerNumber);
      }
  }

  const board = player.gameboard.board;
  const missedHits = player.gameboard.missedHits;
  const directHits = player.gameboard.directHits;

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const grid = createDOMElement({
        elemType: "div",
        parent: gridContainer,
        data: { row, col },
      });

      if (missedHits.has(JSON.stringify([row, col]))) {
        grid.classList.add("missed");
      }
      if (directHits.has(JSON.stringify([row, col]))) {
        grid.classList.add("hit");
      }
      if (board[row][col] && isPlayerTurn) {
        grid.classList.add("ship");
      }
      if (board[row][col] && board[row][col].isSunk()) {
        grid.classList.add("sunk");
      }
    }
  }
}

export function renderPlayersBoard(option) {
  switch (option) {
    case "both":
      renderBoard(1);
      renderBoard(2);
      break;
    case 1:
      renderBoard(1);
      break;
    case 2:
      renderBoard(2);
  }
}
