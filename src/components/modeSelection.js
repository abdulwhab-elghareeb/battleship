import { loadMultiMode, loadSingleMode } from "../handlers/modeHandlers.js";
import { createDOMElement } from "../helpers/domHelpers.js";

export function renderModeSelection() {
  const mainContainer = document.querySelector("#main-container");
  mainContainer.replaceChildren();
  mainContainer.className = "mode";

  createDOMElement({
    elemType: "div",
    class: "mode-select",
    parent: mainContainer,
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
            event: { type: "click", callback: loadMultiMode },
          }),
          createDOMElement({
            elemType: "button",
            textContent: "Player vs CPU",
            event: { type: "click", callback: loadSingleMode },
          }),
        ],
      }),
    ],
  });
}
