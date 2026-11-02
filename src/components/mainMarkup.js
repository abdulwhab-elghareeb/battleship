import { createDOMElement } from "../helpers/domHelpers.js";

export function renderMainMarkup() {
  const mainContainer = document.querySelector("#main-container");
  mainContainer.replaceChildren();
  mainContainer.className = "main";

  mainContainer.append(
    createDOMElement({
      elemType: "h1",
      className: "result",
    }),
    createDOMElement({
      elemType: "div",
      className: "player player1",
      children: [
        createDOMElement({
          elemType: "h1",
          textContent: "Player 1",
        }),
      ],
    }),
    createDOMElement({
      elemType: "div",
      className: "player player2",
      children: [
        createDOMElement({
          elemType: "h1",
          textContent: "Player 2",
        }),
      ],
    }),
  );
}
