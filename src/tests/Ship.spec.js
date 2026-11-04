import { expect, test, describe } from "@jest/globals";
import { Ship } from "../classes/Ship.js";

describe("Ship class", () => {
  test("Ship exists", () => {
    expect(Ship).toBeDefined();
  });

  test("Hit and isSunk methods work as expected", () => {
    const testShip = new Ship(4);
    testShip.hit();
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBe(false);
    testShip.hit();
    expect(testShip.isSunk()).toBe(true);
  });
});
