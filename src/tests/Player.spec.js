import { expect, test, describe } from "@jest/globals";
import { Player } from "../classes/Player.js";

describe("Player class", () => {
  test("player class exists", () => {
    expect(Player).toBeDefined();
  });

  test("player has it's own gameboard", () => {
    expect(new Player().gameboard.areAllShipsSunk()).toBe(true);
  });
});
