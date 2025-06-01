export type Cards = {
  emojiId: number;
  index: number;
  isFlipped: boolean;
  isMatched: boolean;
};

export type GameStateType = {
  matches: number;
  mistakes: number;
  timeLimit: number;
  pairs: number;

  isGameOver: boolean;
  isGameStarted: boolean;

  cards: Cards[];
  flippedCardIndexes: number[];
};
