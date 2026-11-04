import { expect, test, describe } from "@jest/globals";
import { Player } from "../classes/Player.js";

describe("Player class", () => {
  test("Player class exists", () => {
    expect(Player).toBeDefined();
  });

  test("Player has it's own gameboard", () => {
    expect(new Player().gameboard.areAllShipsSunk()).toBe(true);
  });
});
