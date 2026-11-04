import { gameState } from "../classes/GameState.js";
import {
  changeShipsDirection,
  isVertical,
} from "../handlers/shipPlacingHandlers.js";
import { getDifferences } from "../helpers/arrayHelpers.js";
import { createDOMElement } from "../helpers/domHelpers.js";

export function renderDragContainer(playerNumber) {
  document.querySelector(`.player${playerNumber} .drag-container`)?.remove();

  const NUMBERS_TO_WORDS = {
    2: "two",
    3: "three",
    4: "four",
    5: "five",
  };

  const playerGameboard =
    playerNumber === 1
      ? gameState.player1.gameboard
      : gameState.player2.gameboard;

  const remainingSizes = getDifferences(
    [5, 4, 3, 3, 2],
    playerGameboard.currentShipSizes,
  );

  const container = createDOMElement({
    elemType: "div",
    class: isVertical ? "drag-container vertical" : "drag-container",
    parent: document.querySelector(`.player${playerNumber}`),
  });

  if (remainingSizes.length === 0) return container.remove();
  for (let i = 1; i <= 5 - playerGameboard.shipCount; i++) {
    const size = remainingSizes.shift();
    createDOMElement({
      elemType: "div",
      class: `drag-ships ${NUMBERS_TO_WORDS[size]}`,
      data: { size: size, id: i },
      draggable: true,
      styleHeight: isVertical ? `${size * 55}px` : "55px",
      styleWidth: isVertical ? "55px" : `${size * 55}px`,
      parent: container,
    });
  }
}

export function renderDirectionToggle(playerNumber) {
  createDOMElement({
    elemType: "button",
    class: "direction",
    textContent: "Horizontal",
    event: {
      type: "click",
      callback: (e) => changeShipsDirection(e, playerNumber),
    },
    parent: document.querySelector(`.player${playerNumber}`),
  });
}
