import { onRestartClick } from "../handlers/events.js";
import { createDOMElement } from "../helpers/domHelpers.js";

export function renderRestartBtn() {
  document.querySelector(".restart")?.remove();

  createDOMElement({
    elemType: "button",
    className: "restart",
    textContent: "Restart",
    parent: document.querySelector("#main-container"),
    event: { type: "click", callback: onRestartClick },
  });
}
