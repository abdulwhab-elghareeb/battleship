import { restartGame } from "../handlers/flowHandlers.js";
import { createDOMElement } from "../helpers/domHelpers.js";

export function renderReturnToModeSelection() {
  createDOMElement({
    elemType: "button",
    class: "return",
    textContent: "← Mode Selection",
    parent: document.querySelector("#main-container"),
    event: { type: "click", callback: restartGame },
  });
}
