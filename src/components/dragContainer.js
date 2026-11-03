import { createDOMElement } from "../helpers/domHelpers.js";

export function renderDragContainer(playerNumber) {
  const container = createDOMElement({
    elemType: "div",
    className: "drag-container",
    parent: document.querySelector(`.player${playerNumber}`),
  });

  const sizes = [6, 4, 3, 3, 2];
  const numbersToWords = {
    2: "two",
    3: "three",
    4: "four",
    6: "six",
  };

  for (let i = 1; i <= 5; i++) {
    const size = sizes.shift();
    createDOMElement({
      elemType: "div",
      className: `drag-ships ${numbersToWords[size]}`,
      data: { size: size, id: i },
      draggable: true,
      parent: container,
    });
  }
}
