import { expect, test, describe } from "@jest/globals";
import { GameState } from "../classes/GameState.js";

describe("GameState class", () => {
  test("The class exists", () => {
    expect(GameState).toBeDefined();
  });

  const testGameState = new GameState();
  test("Contains information about the current mode", () => {
    testGameState.setMode("single");
    testGameState.setMode("foobar");
    expect(testGameState.mode).toBe("single");
  });

  test("Contains information about the current phase of the game", () => {
    expect(testGameState.phase).toBe("notStarted");
    testGameState.toNextPhase();
    expect(testGameState.phase).toBe("started");
    testGameState.toNextPhase();
    expect(testGameState.phase).toBe("ended");
    testGameState.toNextPhase();
    expect(testGameState.phase).toBe("notStarted");
  });

  test("Contains information about the players", () => {
    testGameState.setPlayer1("Foobar");
    testGameState.setPlayer2("Baz");
    expect(testGameState.player1).toBe("Foobar");
    expect(testGameState.player2).toBe("Baz");
  });

  test("Contains information about the current turn", () => {
    expect(testGameState.currentTurn).toBe(1);
    testGameState.swapTurns();
    expect(testGameState.currentTurn).toBe(2);
  });

  test("Contains information about whether a player attacked", () => {
    testGameState.setPlayer1AsAttacked();
    expect(testGameState.didPlayer1Attack).toBe(true);
    expect(testGameState.didPlayer2Attack).toBe(false);
  });
});
