import { gameState } from "../classes/GameState.js";
import { createDOMElement } from "../helpers/domHelpers.js";

export function renderMainMarkup() {
  const mainContainer = document.querySelector("#main-container");
  mainContainer.replaceChildren();
  mainContainer.className = "main";

  mainContainer.append(
    createDOMElement({
      elemType: "h1",
      class: "result",
    }),
    createDOMElement({
      elemType: "div",
      class: "player player1",
      children: [
        createDOMElement({
          elemType: "h1",
          class: "turn",
          textContent: "Player 1",
        }),
      ],
    }),
    createDOMElement({
      elemType: "div",
      class: "player player2",
      children: [
        createDOMElement({
          elemType: "h1",
          textContent: "Player 2",
        }),
      ],
    }),
  );
}

export function updateVisualTurn() {
  const currTurn = gameState.currentTurn;
  const nextTurn = currTurn === 1 ? 2 : 1;
  document.querySelector(`.player${currTurn} h1`).classList.add("turn");
  document.querySelector(`.player${nextTurn} h1`).classList.remove("turn");
}
