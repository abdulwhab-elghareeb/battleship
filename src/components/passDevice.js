import { onContinueClick } from "../handlers/events.js";
import { createDOMElement } from "../helpers/domHelpers.js";

export function renderPassDeviceScreen() {
  createDOMElement({
    elemType: "div",
    class: "pass-device hidden",
    parent: document.body,
    children: createDOMElement(
      {
        elemType: "h1",
        textContent: "Pass the device to the other player",
      },
      {
        elemType: "button",
        textContent: "continue",
        event: { type: "click", callback: onContinueClick },
      },
    ),
  });
}

export function showPassDevice() {
  document.querySelector(".pass-device").classList.remove("hidden");
}

export function hidePassDevice() {
  document.querySelector(".pass-device").classList.add("hidden");
}
