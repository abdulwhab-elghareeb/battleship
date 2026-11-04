import { gameState } from "../gameState.js";
import { onStartClick } from "../handlers/flowHandlers.js";
import { createDOMElement } from "../helpers/domHelpers.js";

export function renderStartBtn(playerNumber) {
  document.querySelector(".start")?.remove();
  const player = playerNumber === 1 ? gameState.player1 : gameState.player2;
  createDOMElement({
    elemType: "button",
    class: "start",
    textContent: "Start",
    parent: document.querySelector("#main-container"),
    event: {
      type: "click",
      callback: (e) => onStartClick(e, player),
    },
  });
}
