import { onStartClick } from "../handlers/events.js";
import { createDOMElement } from "../helpers/domHelpers.js";

export function renderStartBtn(player) {
  createDOMElement({
    elemType: "button",
    className: "start",
    textContent: "Start",
    parent: document.body,
    event: { type: "click", callback: (e) => onStartClick(e, player) },
  });
}
