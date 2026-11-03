import { onRandomizeClick, onResetShipsClick } from "../handlers/events.js";
import { createDOMElement } from "../helpers/domHelpers.js";

export function renderRandomizeShipsBtn(number, player) {
  createDOMElement({
    elemType: "button",
    className: "randomize",
    textContent: "Randomize",
    parent: document.querySelector(`.player${number}`),
    event: { type: "click", callback: () => onRandomizeClick(number, player) },
  });
}

export function renderResetShipsBtn(playerNumber) {
  createDOMElement({
    elemType: "button",
    className: "reset-ships",
    textContent: "Reset",
    parent: document.querySelector(`.player${playerNumber}`),
    event: { type: "click", callback: () => onResetShipsClick(playerNumber) },
  });
}
