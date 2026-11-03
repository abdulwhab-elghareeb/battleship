import { createDOMElement } from "../helpers/domHelpers.js";

export function renderDragContainer(playerNumber) {
  document.querySelector(`.player${playerNumber} .drag-container`)?.remove();

  const container = createDOMElement({
    elemType: "div",
    className: "drag-container",
    parent: document.querySelector(`.player${playerNumber}`),
  });

  const sizes = [5, 4, 3, 3, 2];
  const numbersToWords = {
    2: "two",
    3: "three",
    4: "four",
    5: "five",
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
