import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertBoxVariants } from '@/components/AlertBox';
import { generateCards } from '@/utils/card-utils';
import { GameStateType } from './game.types';
import { settingsInitialState } from './settings.slice';
import { SettingsStateType } from './settings.types';
import { RootState } from './store';

const { allowedMistakes, username } = settingsInitialState;

export const gameOverMessages: {
  [key in Exclude<GameStateType['gameOverReason'], 'none'>]: {
    message: (username: string) => string;
    title: string;
    variant: AlertBoxVariants;
  };
} = {
  'out-of-time': {
    message: (username) => `${username}, time is up! 😢`,
    title: 'Game Over',
    variant: 'destructive'
  },
  'out-of-mistakes': {
    message: (username) => `${username}, you made too many mistakes. 😞`,
    title: 'Game Over',
    variant: 'destructive'
  },
  'all-matched': {
    message: (username) => `${username}, congratulations! All cards matched! 🎉`,
    title: 'You Win!',
    variant: 'constructive'
  }
};

const initialState: GameStateType = {
  matches: 0,
  mistakes: 0,
  timeLeft: 0,

  isGameOver: false,
  isPaused: false,
  isGameStarted: false,
  isTransitioning: false,
  gameOverReason: 'none',

  cards: [],
  flippedCardIndexes: [], // this is here so its easier to enforce stuff like 2 cards can be flipped at once, i dotn wanna have to count the number of flipped cards every time i flip a card
  // this only stores temporarily flipped cards
  // once a card is matched, it will be removed from this array
  // and you cant flip a card if its matched or already flipped

  //keeping these in case guy changes settings mid-game but we still need the old settings
  allowedMistakes,
  username
};

const isBoardLocked = (state: GameStateType): boolean => {
  const areThereTwoFlippedCards = state.flippedCardIndexes.length >= 2; //2 cards are flipped
  const isTransitioning = state.isTransitioning; //animation in progress
  return (
    state.isGameOver ||
    !state.isGameStarted ||
    areThereTwoFlippedCards ||
    isTransitioning ||
    state.isPaused
  );
};

//selectors
export const selectMatches = (state: RootState) => state.game.matches;
export const selectMistakes = (state: RootState) => state.game.mistakes;
export const selectCards = (state: RootState) => state.game.cards;
//need to memoize this because it went into rerender loop
export const selectGameStatus = createSelector(
  (state: RootState) => state.game,
  (game: GameStateType) => ({
    isGameOver: game.isGameOver,
    isGameStarted: game.isGameStarted,
    gameOverReason: game.gameOverReason
  })
);
export const selectFlippedCardIndexes = (state: RootState) => state.game.flippedCardIndexes;
export const selectTimeLeft = (state: RootState) => state.game.timeLeft;
export const selectGameOverReason = (state: RootState) => state.game.gameOverReason;
export const selectUsername = (state: RootState) => state.game.username;
export const selectIsBoardLocked = (state: RootState) => {
  return isBoardLocked(state.game);
};

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

  startGame(state: GameStateType, action: PayloadAction<SettingsStateType>): GameStateType {
    return {
      ...gameSlice.caseReducers.resetGame(state, action),
      isGameStarted: true,
      isGameOver: false
    };
  },

  updateTimer(state: GameStateType) {
    if (isBoardLocked(state)) {
      return;
    }
    if (state.timeLeft > 0) {
      state.timeLeft -= 1;
      return;
    }
    //time is up
    state.gameOverReason = 'out-of-time';
    state.isGameOver = true;
    state.isGameStarted = false;
  },

  flipCard(state: GameStateType, action: PayloadAction<number>) {
    //if board is locked we dont allow flipping
    if (isBoardLocked(state)) {
      return;
    }

    const { payload: cardId } = action;

    if (state.cards[cardId].isMatched || state.cards[cardId].isFlipped) return;

    //if more than 2 cards are flipped, we dont allow flipping
    if (state.flippedCardIndexes.length >= 2) {
      return;
    }

    state.cards[cardId].isFlipped = true;
    state.flippedCardIndexes.push(cardId);

    gameSlice.caseReducers.checkMatches(state);
  },
  togglePause(state: GameStateType) {
    if (state.isGameOver || !state.isGameStarted) {
      return;
    }
    state.isPaused = !state.isPaused;
  },
  checkMatches(state: GameStateType) {
    if (state.flippedCardIndexes.length !== 2) return;

    const [firstIndex, secondIndex] = state.flippedCardIndexes;

    //this should never happen bc i have early returns in flipCard
    //but just in case
    if (firstIndex === secondIndex) {
      return;
    }

    if (state.cards[firstIndex].emojiId === state.cards[secondIndex].emojiId) {
      state.cards[firstIndex].isMatched = true;
      state.cards[secondIndex].isMatched = true;
      state.matches += 1;
    } else {
      state.mistakes += 1;
    }

    gameSlice.caseReducers.checkEndByMistakesOrMatches(state);
  },
  //i wont check time here, ill do it in the timer reducer
  checkEndByMistakesOrMatches(state: GameStateType) {
    if (state.mistakes >= state.allowedMistakes) {
      state.gameOverReason = 'out-of-mistakes';
      state.isGameOver = true;
      state.isGameStarted = false;
    }

    if (state.matches === state.cards.length / 2) {
      state.gameOverReason = 'all-matched';
      state.isGameOver = true;
      state.isGameStarted = false;
    }
  },

  clearFlippedCards(state: GameStateType) {
    //this wont ever run if there arent 2 flipped cards, but ill add this check just in case
    if (state.flippedCardIndexes.length < 2) return;

    const [firstIdx, secondIdx] = state.flippedCardIndexes;

    //we dont actually have to check second card because if the first one is matched, the second one is also matched
    //but i'll add it why not
    const areTheyMatches = state.cards[firstIdx].isMatched && state.cards[secondIdx].isMatched;

    if (!areTheyMatches) {
      for (const index of state.flippedCardIndexes) {
        state.cards[index].isFlipped = false;
      }
    }
    state.flippedCardIndexes = [];
  },

  setTransitioning(state: GameStateType, action: PayloadAction<boolean>) {
    state.isTransitioning = action.payload;
  }
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers
});

//actions
export const {
  resetGame,
  startGame,
  updateTimer,
  flipCard,
  clearFlippedCards,
  setTransitioning,
  togglePause
} = gameSlice.actions;
