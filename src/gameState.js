export const gameState = (() => {
  let isGameStarted = false;
  return {
    get isGameStarted() {
      return isGameStarted;
    },

    set isGameStarted(val) {
      if (val === true || val === false) {
        isGameStarted = val;
      }
    },
  };
})();
