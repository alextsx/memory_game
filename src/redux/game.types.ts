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

  cards: Card[];
  flippedCardIndexes: number[];
} & Pick<SettingsStateType, 'allowedMistakes' | 'username'>;
