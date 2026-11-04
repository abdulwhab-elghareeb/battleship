import { gameState } from "../gameState.js";
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
  const turn = +gameState.turn.at(-1);
  const otherPlayer = turn === 1 ? 2 : 1;
  document.querySelector(`.player${turn} h1`).classList.add("turn");
  document.querySelector(`.player${otherPlayer} h1`).classList.remove("turn");
}
