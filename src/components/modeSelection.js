import { loadRegularMode } from "../handlers/modeHandlers.js";
import { createDOMElement } from "../helpers/domHelpers.js";

export function renderModeSelection() {
  document.body.replaceChildren();
  document.body.className = "mode";

  createDOMElement({
    elemType: "div",
    className: "mode-select",
    parent: document.body,
    children: [
      createDOMElement({
        elemType: "h1",
        textContent: "Choose a mode",
      }),
      createDOMElement({
        elemType: "div",
        children: [
          createDOMElement({
            elemType: "button",
            textContent: "Player vs Player",
          }),
          createDOMElement({
            elemType: "button",
            textContent: "Player vs CPU",
            event: { type: "click", callback: loadRegularMode },
          }),
        ],
      }),
    ],
  });
}
