//selectors
//reducers
import {
  gameSlice,
  resetGame,
  selectCards,
  selectFlippedCardIndexes,
  selectGameStatus,
  selectIsBoardLocked,
  selectMatches,
  selectMistakes,
  selectTimeLeft,
  selectUsername
} from './game.slice';
import { GameStateType } from './game.types';
import { SettingsStateType } from './settings.types';
import { RootState } from './store';

describe('Game Slice Reducers', () => {
  const initialState: GameStateType = {
    matches: 0,
    mistakes: 0,
    timeLeft: 60,
    isGameOver: false,
    isPaused: false,
    isGameStarted: false,
    isTransitioning: false,
    gameOverReason: 'none',
    cards: [],
    flippedCardIndexes: [],
    allowedMistakes: 3,
    username: 'TestUser'
  };

  const gameStartedState: GameStateType = {
    ...initialState,
    isGameStarted: true
  };

  it('should handle resetGame and update state based on settings', () => {
    const settings: SettingsStateType = {
      pairs: 4,
      timeLimit: 120,
      username: 'NewUser',
      allowedMistakes: 5
    };

    const nextState = gameSlice.reducer(initialState, resetGame(settings));

    expect(nextState.timeLeft).toBe(120);
    expect(nextState.username).toBe('NewUser');
    expect(nextState.allowedMistakes).toBe(5);
    expect(nextState.cards.length).toBe(8);
    expect(nextState.isGameStarted).toBe(false);
    expect(nextState.isGameOver).toBe(false);
    expect(nextState.matches).toBe(0);
    expect(nextState.mistakes).toBe(0);
    expect(nextState.flippedCardIndexes).toEqual([]);
  });

  it('startGame should set isGameStarted to true and reset game state', () => {
    const settings: SettingsStateType = {
      pairs: 4,
      timeLimit: 120,
      username: 'NewUser',
      allowedMistakes: 5
    };
    const nextState = gameSlice.reducer(initialState, gameSlice.actions.startGame(settings));
    expect(nextState.isGameStarted).toBe(true);
    expect(nextState.isGameOver).toBe(false);
    expect(nextState.timeLeft).toBe(120);
    expect(nextState.username).toBe('NewUser');
    expect(nextState.allowedMistakes).toBe(5);
    expect(nextState.cards.length).toBe(8);
    expect(nextState.matches).toBe(0);
    expect(nextState.mistakes).toBe(0);
    expect(nextState.flippedCardIndexes).toEqual([]);
  });

  it('updateTimer should decrease timeLeft if board isnt locked', () => {
    const stateWithTimeLeft = {
      ...gameStartedState,
      timeLeft: 10
    };

    const nextState = gameSlice.reducer(stateWithTimeLeft, gameSlice.actions.updateTimer());

    expect(nextState.timeLeft).toBe(9);
    expect(nextState.isGameOver).toBe(false);
  });
  it('updateTimer should set gameOverReason to out-of-time when timeLeft is at 0', () => {
    const stateWith0SecondsLeft = {
      ...gameStartedState,
      timeLeft: 0
    };
    const nextState = gameSlice.reducer(stateWith0SecondsLeft, gameSlice.actions.updateTimer());

    expect(nextState.timeLeft).toBe(0);
    expect(nextState.isGameOver).toBe(true);
    expect(nextState.gameOverReason).toBe('out-of-time');
  });

  it('updateTimer should not change timeLeft if board is locked', () => {
    const stateWithLock = { ...initialState, isTransitioning: true, timeLeft: 10 };
    const nextState = gameSlice.reducer(stateWithLock, gameSlice.actions.updateTimer());

    expect(nextState.timeLeft).toBe(10);
    expect(nextState.isGameOver).toBe(false);
  });
  it('flipCard should set isFlipped to true and add index to flippedCardIndexes', () => {
    const stateWithCards = {
      ...gameStartedState,
      cards: [
        { emojiId: 0, isMatched: false, isFlipped: false },
        { emojiId: 1, isMatched: false, isFlipped: false },
        { emojiId: 0, isMatched: false, isFlipped: false },
        { emojiId: 1, isMatched: false, isFlipped: false }
      ]
    };
    const nextState = gameSlice.reducer(stateWithCards, gameSlice.actions.flipCard(0));

    expect(nextState.cards[0].isFlipped).toBe(true);
    expect(nextState.flippedCardIndexes).toContain(0);
  });

  it('flipCard should not flip card if board is locked', () => {
    const stateWithLock = {
      ...initialState,
      isTransitioning: true,
      cards: [{ emojiId: 0, isMatched: false, isFlipped: false }]
    };
    const nextState = gameSlice.reducer(stateWithLock, gameSlice.actions.flipCard(0));

    expect(nextState.cards[0].isFlipped).toBe(false);
    expect(nextState.flippedCardIndexes).toEqual([]);
  });

  it('flipCard should not flip already matched or flipped cards', () => {
    const stateWithCards = {
      ...gameStartedState,
      cards: [
        { emojiId: 0, isMatched: true, isFlipped: true },
        { emojiId: 1, isMatched: false, isFlipped: false }
      ]
    };
    const nextState = gameSlice.reducer(stateWithCards, gameSlice.actions.flipCard(0));

    expect(nextState.flippedCardIndexes).toEqual([]);
  });

  it('flipCard should not allow flipping more than 2 cards at once', () => {
    const stateWithFlippedCards = {
      ...gameStartedState,
      flippedCardIndexes: [0, 1],
      cards: [
        { emojiId: 0, isMatched: false, isFlipped: false },
        { emojiId: 1, isMatched: false, isFlipped: false },
        { emojiId: 2, isMatched: false, isFlipped: false }
      ]
    };
    const nextState = gameSlice.reducer(stateWithFlippedCards, gameSlice.actions.flipCard(2));

    expect(nextState.flippedCardIndexes).toEqual([0, 1]);
    expect(nextState.cards[2].isFlipped).toBe(false);
  });

  it('togglePause should toggle isPaused state', () => {
    const pausedState = { ...gameStartedState, isPaused: true };
    const nextState = gameSlice.reducer(pausedState, gameSlice.actions.togglePause());

    expect(nextState.isPaused).toBe(false);

    const unpausedState = { ...gameStartedState, isPaused: false };
    const nextUnpausedState = gameSlice.reducer(unpausedState, gameSlice.actions.togglePause());

    expect(nextUnpausedState.isPaused).toBe(true);
  });

  it('checkMatches should mark cards as matched if they match', () => {
    const stateWithFlippedCards = {
      ...gameStartedState,
      flippedCardIndexes: [0, 1],
      cards: [
        { emojiId: 0, isMatched: false, isFlipped: true },
        { emojiId: 0, isMatched: false, isFlipped: true },
        { emojiId: 1, isMatched: false, isFlipped: false }
      ]
    };
    const nextState = gameSlice.reducer(stateWithFlippedCards, gameSlice.actions.checkMatches());

    expect(nextState.cards[0].isMatched).toBe(true);
    expect(nextState.cards[1].isMatched).toBe(true);
    expect(nextState.matches).toBe(1);
  });
});
/* 



  //selector testing
  /* 

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
  
  */

describe('Game slice selectors', () => {
  const initialRootState: RootState = {
    game: {
      matches: 0,
      mistakes: 1,
      timeLeft: 60,
      isGameOver: false,
      isPaused: true,
      isGameStarted: true,
      isTransitioning: false,
      gameOverReason: 'none',
      cards: [
        { emojiId: 0, isMatched: false, isFlipped: false },
        { emojiId: 1, isMatched: false, isFlipped: false },
        { emojiId: 0, isMatched: false, isFlipped: false },
        { emojiId: 1, isMatched: false, isFlipped: false },
        //add 2 flipped
        { emojiId: 2, isMatched: false, isFlipped: true },
        { emojiId: 3, isMatched: false, isFlipped: true }
      ],
      flippedCardIndexes: [5, 6],
      allowedMistakes: 3,
      username: 'TestUser'
    },
    settings: {
      pairs: 4,
      timeLimit: 120,
      username: 'TestUser',
      allowedMistakes: 3
    }
  };
  it('selectMatches should return the number of matches', () => {
    const matches = selectMatches(initialRootState);
    expect(matches).toBe(0);
  });

  it('selectMistakes should return the number of mistakes', () => {
    const mistakes = selectMistakes(initialRootState);
    expect(mistakes).toBe(1);
  });

  it('selectCards should return the cards array', () => {
    expect(selectCards(initialRootState)).toEqual([
      { emojiId: 0, isMatched: false, isFlipped: false },
      { emojiId: 1, isMatched: false, isFlipped: false },
      { emojiId: 0, isMatched: false, isFlipped: false },
      { emojiId: 1, isMatched: false, isFlipped: false },
      { emojiId: 2, isMatched: false, isFlipped: true },
      { emojiId: 3, isMatched: false, isFlipped: true }
    ]);
  });

  it('selectGameStatus should return game status', () => {
    const gameStatus = selectGameStatus(initialRootState);
    expect(gameStatus.isGameOver).toBe(false);
    expect(gameStatus.isGameStarted).toBe(true);
    expect(gameStatus.gameOverReason).toBe('none');
  });

  it('selectFlippedCardIndexes should return the flipped card indexes', () => {
    const flippedIndexes = selectFlippedCardIndexes(initialRootState);
    expect(flippedIndexes).toEqual([5, 6]);
  });

  it('selectTimeLeft should return the time left', () => {
    const timeLeft = selectTimeLeft(initialRootState);
    expect(timeLeft).toBe(60);
  });

  it('selectGameOverReason should return the game over reason', () => {
    const gameOverReason = initialRootState.game.gameOverReason;
    expect(gameOverReason).toBe('none');
  });

  it('selectUsername should return the username', () => {
    const username = selectUsername(initialRootState);
    expect(username).toBe('TestUser');
  });
  it('selectIsBoardLocked should return true if board is locked', () => {
    const isBoardLocked = selectIsBoardLocked(initialRootState);
    expect(isBoardLocked).toBe(true);
  });
});
