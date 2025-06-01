import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateCards } from '@/utils/card-utils';
import { GameStateType } from './game.types';
import { settingsInitialState } from './settings.slice';
import { SettingsStateType } from './settings.types';
import { RootState } from './store';

const { allowedMistakes, username } = settingsInitialState;

const initialState: GameStateType = {
  matches: 0,
  mistakes: 0,
  timeLeft: 0,

  isGameOver: false,
  isGameStarted: false,

  cards: [],
  flippedCardIndexes: [], // this is here so its easier to enforce stuff like 2 cards can be flipped at once, i dotn wanna have to count the number of flipped cards every time i flip a card
  // this only stores temporarily flipped cards
  // once a card is matched, it will be removed from this array
  // and you cant flip a card if its matched or already flipped

  //keeping these in case guy changes settings mid-game but we still need the old settings
  allowedMistakes,
  username
};

//selectors
export const selectMatches = (state: RootState) => state.game.matches;
export const selectMistakes = (state: RootState) => state.game.mistakes;
export const selectCards = (state: RootState) => state.game.cards;

const reducers = {
  resetGame(_: GameStateType, action: PayloadAction<SettingsStateType>) {
    const { timeLimit, username, allowedMistakes } = action.payload;
    return {
      ...initialState,
      timeLeft: timeLimit,
      username,
      allowedMistakes,
      cards: generateCards(action.payload.pairs)
    };
  },

  startGame(state: GameStateType) {
    state.isGameStarted = true;
    state.isGameOver = false;
  },

  endGame(state: GameStateType) {
    state.isGameOver = true;
    state.isGameStarted = false;
  },

  reduceTimer(state: GameStateType) {
    if (state.timeLeft > 0) {
      state.timeLeft -= 1;
      return;
    }
    //time is up
    //gameSlice.caseReducers.endGame(state); <-could do this but its easier to test this way
    state.isGameOver = true;
    state.isGameStarted = false;
    console.warn('Time is up! Game over.');
  }
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers
});

//actions
export const { resetGame, startGame, endGame, reduceTimer } = gameSlice.actions;
