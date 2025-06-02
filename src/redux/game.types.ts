import { SettingsStateType } from './settings.types';

export type Card = {
  emojiId: number;
  isFlipped: boolean;
  isMatched: boolean;
};

export type GameStateType = {
  matches: number;
  mistakes: number;
  timeLeft: number;

  isGameOver: boolean;
  isGameStarted: boolean;
  isTransitioning: boolean;
  isPaused: boolean;

  gameOverReason: 'out-of-time' | 'out-of-mistakes' | 'all-matched' | 'none';

  cards: Card[];
  flippedCardIndexes: number[];
} & Pick<SettingsStateType, 'allowedMistakes' | 'username'>;
