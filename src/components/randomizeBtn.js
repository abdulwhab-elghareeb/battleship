import { onRandomizeClick } from "../handlers/events.js";
import { createDOMElement } from "../helpers/domHelpers.js";

export function renderRandomizeBtn(number, player) {
  createDOMElement({
    elemType: "button",
    className: "randomize",
    textContent: "Randomize",
    parent: document.querySelector(`.player${number}`),
    event: { type: "click", callback: () => onRandomizeClick(number, player) },
  });
}
