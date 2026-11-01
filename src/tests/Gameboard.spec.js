import { expect, test, describe } from "@jest/globals";
import { Gameboard } from "../classes/Gameboard.js";

describe("Gameboard class", () => {
  test("Gameboard exists", () => {
    expect(Gameboard).toBeDefined();
  });

  const testBoard = new Gameboard();

  test("creates 10x10 gameboard", () => {
    expect(testBoard.board.flat()).toHaveLength(100);
  });

  test("places ships correctly", () => {
    testBoard.placeShip(6, [0, 0]);
    expect(testBoard.board[0][0]).toBeTruthy();
    expect(testBoard.board[0][6]).toBeFalsy();
  });

  test("handles received attacks correctly", () => {
    testBoard.placeShip(2, [2, 1]);
    testBoard.receiveAttack([2, 1]);
    testBoard.receiveAttack([2, 2]);
    expect(testBoard.board[2][1].isSunk()).toBe(true);
    expect(testBoard.directHits).toContain([2, 2].toString());

    testBoard.receiveAttack([2, 5]);
    expect(testBoard.missedHits).toContain([2, 5].toString());
  });

  test("chicks if all ships are sunk", () => {
    expect(testBoard.areAllShipsSunk()).toBe(false);
    expect(new Gameboard().areAllShipsSunk()).toBe(true);
  });
});
