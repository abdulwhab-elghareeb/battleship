import { onRestartClick } from "../handlers/events.js";
import { createDOMElement } from "../helpers/domHelpers.js";

export function renderRestartBtn() {
  createDOMElement({
    elemType: "button",
    className: "restart",
    textContent: "Restart",
    parent: document.body,
    event: { type: "click", callback: onRestartClick },
  });
}
