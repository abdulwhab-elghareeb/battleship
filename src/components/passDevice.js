import { createDOMElement } from "../helpers/domHelpers.js";

export function renderPassDeviceScreen() {
  createDOMElement({
    elemType: "div",
    className: "pass-device hidden",
    textContent: "Pass the device to the other player",
    parent: document.body,
  });
}

export function showPassDevice() {
  document.querySelector(".pass-device").classList.remove("hidden");
}

export function hidePassDevice() {
  document.querySelector(".pass-device").classList.add("hidden");
}
