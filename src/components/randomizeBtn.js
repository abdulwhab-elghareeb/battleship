import { onRandomizeClick } from "../handlers/events.js";
import { createDOMElement } from "../helpers/domHelpers.js";

export function renderRandomizeBtn(player1) {
  createDOMElement({
    elemType: "button",
    className: "randomize",
    textContent: "Randomize",
    parent: document.querySelector(".player1"),
    event: { type: "click", callback: () => onRandomizeClick(player1) },
  });
}
