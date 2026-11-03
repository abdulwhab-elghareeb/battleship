import { onNextClick } from "../handlers/events.js";
import { createDOMElement } from "../helpers/domHelpers.js";

export function renderNextBtn() {
  createDOMElement({
    elemType: "button",
    className: "next",
    textContent: "Next",
    event: { type: "click", callback: onNextClick },
    parent: document.querySelector("#main-container"),
  });
}
