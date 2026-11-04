import {
  randomizeBoardShips,
  resetShips,
} from "../handlers/shipPlacingHandlers.js";
import { createDOMElement } from "../helpers/domHelpers.js";

export function renderRandomizeShipsBtn(number) {
  createDOMElement({
    elemType: "button",
    class: "randomize",
    textContent: "Randomize",
    parent: document.querySelector(`.player${number}`),
    event: { type: "click", callback: () => randomizeBoardShips(number) },
  });
}

export function renderResetShipsBtn(playerNumber) {
  createDOMElement({
    elemType: "button",
    class: "reset-ships",
    textContent: "Reset",
    parent: document.querySelector(`.player${playerNumber}`),
    event: { type: "click", callback: () => resetShips(playerNumber) },
  });
}
