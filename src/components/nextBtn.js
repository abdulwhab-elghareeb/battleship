import { startNextTurn } from "../handlers/flowHandlers.js";
import { createDOMElement } from "../helpers/domHelpers.js";

export function renderNextBtn() {
  createDOMElement({
    elemType: "button",
    class: "next",
    textContent: "Next",
    event: { type: "click", callback: startNextTurn },
    parent: document.querySelector("#main-container"),
  });
}
