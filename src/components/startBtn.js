import { onStartClick } from "../handlers/events.js";
import { createDOMElement } from "../helpers/domHelpers.js";

export function renderStartBtn(player, computer) {
  createDOMElement({
    elemType: "button",
    className: "start",
    textContent: "Start",
    parent: document.querySelector("#main-container"),
    event: {
      type: "click",
      callback: (e) => onStartClick(e, player, computer),
    },
  });
}
