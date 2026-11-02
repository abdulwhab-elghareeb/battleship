import { createDOMElement } from "../helpers/domHelpers.js";

export function renderMainMarkup() {
  document.body.replaceChildren();
  document.body.className = "main";

  document.body.append(
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
