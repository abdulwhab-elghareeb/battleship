import { createDOMElement } from "../helpers/domHelpers.js";

export function createBoard(playerNumber) {
  const gridContainer = createDOMElement({
    elemType: "div",
    id: "board",
    parent: document.querySelector(`.player${playerNumber}`),
  });

  for (let i = 0; i < 100; i++) {
    createDOMElement({ elemType: "div", parent: gridContainer });
  }
}
