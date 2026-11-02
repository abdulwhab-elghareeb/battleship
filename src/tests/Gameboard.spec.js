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

  test("chicks if a move is valid or not", () => {
    const testGameboard = new Gameboard();
    testGameboard.receiveAttack([1, 2]);

    expect(testGameboard.isValidAttack([1, 2])).toBe(false);
    expect(testGameboard.isValidAttack([1, 5])).toBe(true);
  });

  test("shipCount property returns the number of ships on board", () => {
    const testGameboard = new Gameboard();
    testGameboard.placeShip(2, [1, 2]);
    expect(testGameboard.shipCount).toBe(1);
  });

  test("able to place ships randomly", () => {
    const testGameboard = new Gameboard();
    testGameboard.randomizeShips();

    expect(testGameboard.areAllShipsSunk()).toBe(false);
    expect(testGameboard.shipCount).toBe(5);
  });

  test("checks if ship placement is valid", () => {
    expect(new Gameboard().isValidPlacement(2, [9, 9])).toBe(false);
    expect(new Gameboard().isValidPlacement(2, [7, 7])).toBe(true);
  });
});
