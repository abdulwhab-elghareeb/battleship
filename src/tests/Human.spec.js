import { expect, test, describe } from "@jest/globals";
import { Human } from "../classes/Human.js";

describe("Human class", () => {
  test("Human exists", () => {
    expect(Human).toBeDefined();
  });

  test("Attacks a specific place", () => {
    const testPlayer = new Human();
    const againstPlayer = new Human();

    testPlayer.attackPlace([1, 1], againstPlayer);

    expect(
      againstPlayer.gameboard.directHits.has(JSON.stringify([1, 1])) ||
        againstPlayer.gameboard.missedHits.has(JSON.stringify([1, 1])),
    ).toBe(true);
  });

  test("type property returns what type of a player the class is", () => {
    expect(new Human().type).toBe("Real");
  });
});
