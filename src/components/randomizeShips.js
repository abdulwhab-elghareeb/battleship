import {
  onRandomizeClick,
  onResetShipsClick,
} from "../handlers/flowHandlers.js";
import { createDOMElement } from "../helpers/domHelpers.js";

export function renderRandomizeShipsBtn(number) {
  createDOMElement({
    elemType: "button",
    class: "randomize",
    textContent: "Randomize",
    parent: document.querySelector(`.player${number}`),
    event: { type: "click", callback: () => onRandomizeClick(number) },
  });
}

export function renderResetShipsBtn(playerNumber) {
  createDOMElement({
    elemType: "button",
    class: "reset-ships",
    textContent: "Reset",
    parent: document.querySelector(`.player${playerNumber}`),
    event: { type: "click", callback: () => onResetShipsClick(playerNumber) },
  });
}
