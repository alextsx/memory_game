'use client';

import { useSelector } from 'react-redux';
import { selectMatches, selectMistakes, selectTimeLeft } from '@/redux/game.slice';

const CountdownTimer = ({ timeLeft }: { timeLeft: number }) => {
  return <div className="timer">{timeLeft}</div>;
};

const MatchesAndMistakes = ({ matches, mistakes }: { matches: number; mistakes: number }) => {
  return (
    <div className="matches-mistakes_container">
      <span>{matches} matches</span>
      <span>{mistakes} mistakes</span>
    </div>
  );
};

export const GameInfo = () => {
  const matches = useSelector(selectMatches);
  const mistakes = useSelector(selectMistakes);
  const timeLeft = useSelector(selectTimeLeft); // You'll need to add this selector

  return (
    <div className="game-info">
      <CountdownTimer timeLeft={timeLeft} />
      <MatchesAndMistakes matches={matches} mistakes={mistakes} />
    </div>
  );
};
