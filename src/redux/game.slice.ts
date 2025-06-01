import { createSlice } from '@reduxjs/toolkit';
import { GameStateType } from './game.types';
import { RootState } from './store';

const initialState: GameStateType = {
  matches: 0,
  mistakes: 0,
  timeLimit: 60,
  pairs: 12,

  isGameOver: false,
  isGameStarted: false,

  cards: [],
  flippedCardIndexes: [] // this is here so its easier to enforce stuff like 2 cards can be flipped at once, i dotn wanna have to count the number of flipped cards every time i flip a card
  // this only stores temporarily flipped cards
  // once a card is matched, it will be removed from this array
  // and you cant flip a card if its matched or already flipped
};

//selectors
export const selectTimeLimit = (state: RootState) => state.game.timeLimit;
export const selectMatches = (state: RootState) => state.game.matches;
export const selectMistakes = (state: RootState) => state.game.mistakes;
export const selectCards = (state: RootState) => state.game.cards;

const reducers = {};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers
});

//actions
export const {} = gameSlice.actions;
