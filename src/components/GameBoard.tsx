'use client';

import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cn } from '@/utils/cn';
import { useAlert } from '@/hocs/AlertProvider';
import {
  clearFlippedCards,
  flipCard,
  gameOverMessages,
  resetGame,
  selectCards,
  selectFlippedCardIndexes,
  selectGameStatus,
  selectIsBoardLocked,
  selectUsername,
  setTransitioning,
  updateTimer
} from '@/redux/game.slice';
import { selectSettings } from '@/redux/settings.slice';
import { Card } from './card/Card';

const GameBoard = () => {
  const dispatch = useDispatch();
  const cards = useSelector(selectCards);
  const settings = useSelector(selectSettings);
  const username = useSelector(selectUsername);
  const flippedCardIndexes = useSelector(selectFlippedCardIndexes);
  const { show: showAlert } = useAlert();
  const { isGameOver, isGameStarted, gameOverReason } = useSelector(selectGameStatus);

  const isBoardLocked = useSelector(selectIsBoardLocked);

  //timeout ref for clearing flipped cards, we do ref so we can clear it if the component unmounts
  const flipCardsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    //reset game if page mounts and game is not started
    if (!cards.length) {
      dispatch(resetGame(settings));
    }
  }, [cards.length, dispatch, settings]);

  //decreasing timer if game has started
  useEffect(() => {
    if (!isGameStarted) return;

    const timer: NodeJS.Timeout = setInterval(() => {
      dispatch(updateTimer());
    }, 1000);

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isGameStarted, dispatch]);

  //clearing flipped cards when 2 cards r flipped
  useEffect(() => {
    if (flippedCardIndexes.length < 2) return;

    dispatch(setTransitioning(true));

    flipCardsTimeoutRef.current = setTimeout(() => {
      dispatch(clearFlippedCards());
      dispatch(setTransitioning(false));
    }, 1000);

    return () => {
      if (!flipCardsTimeoutRef.current) return;
      clearTimeout(flipCardsTimeoutRef.current);
      dispatch(setTransitioning(false));
    };
  }, [flippedCardIndexes, dispatch]);

  const handleClick = (index: number) => {
    //every check happens in the redux slice, so we just dispatch the action
    dispatch(flipCard(index));
  };

  //if game is over  we display messages
  useEffect(() => {
    if (!isGameOver) return;
    if (gameOverReason === 'none') return; //game hasnt started yet

    const { message, title, variant } = gameOverMessages[gameOverReason];

    showAlert({
      message: message(username),
      title,
      variant
    });
  }, [isGameOver, gameOverReason, showAlert, username]);

  return (
    <main className="game-board">
      {cards.map((card, index) => (
        <Card
          key={index}
          emojiId={card.emojiId}
          isFlipped={card.isFlipped}
          onClick={() => handleClick(index)}
          className={cn(!isBoardLocked && 'interactable', card.isMatched && 'matched')}
        />
      ))}
    </main>
  );
};

export default GameBoard;
