import { expect, test, describe } from "@jest/globals";
import { Computer } from "../classes/Computer.js";

describe("Computer class", () => {
  test("Computer exists", () => {
    expect(Computer).toBeDefined();
  });

  test("Attacks a random valid point", () => {
    const testComputer = new Computer();

    const againstComputer = new Computer();
    const againstComputerBoard = againstComputer.gameboard;
    const againstMissedHits = againstComputerBoard.missedHits;
    const againstDirectHits = againstComputerBoard.directHits;

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (col === 9 && row === 9) break;
        againstComputerBoard.receiveAttack([row, col]);
      }
    }

    expect(
      againstMissedHits.has(JSON.stringify([9, 9])) ||
        againstDirectHits.has(JSON.stringify([9, 9])),
    ).toBe(false);

    testComputer.attackRandomPlace(againstComputer);

    expect(
      againstMissedHits.has(JSON.stringify([9, 9])) ||
        againstDirectHits.has(JSON.stringify([9, 9])),
    ).toBe(true);
  });

  test("it tries hitting adjacent slots after hitting a ship", () => {
    const testComputer = new Computer();
    const enemy = new Computer();
    enemy.gameboard.placeShip(4, [0, 5]);
    enemy.gameboard.receiveAttack([0, 5]);

    testComputer.attackRandomPlace(enemy);
    expect(enemy.gameboard.directHits).toContain(JSON.stringify([0, 6]));
  });

  test("type property returns what type of a player the class is", () => {
    expect(new Computer().type).toBe("CPU");
  });
});
