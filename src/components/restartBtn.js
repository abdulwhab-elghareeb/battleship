import { onRestartClick } from "../handlers/flowHandlers.js";
import { createDOMElement } from "../helpers/domHelpers.js";

export function renderRestartBtn() {
  document.querySelector(".restart")?.remove();

  createDOMElement({
    elemType: "button",
    class: "restart",
    textContent: "Restart",
    parent: document.querySelector("#main-container"),
    event: { type: "click", callback: onRestartClick },
  });
}
