const CountdownTimer = ({ secondsLeft }: { secondsLeft: number }) => {
  return <div className="timer">{secondsLeft}</div>;
};

//component for displaying matches found and mistakes made
const MatchesAndMistakes = ({ matches, mistakes }: { matches: number; mistakes: number }) => {
  return (
    <div className="matches-mistakes_container">
      <span>{matches} matches</span>
      <span>{mistakes} mistakes</span>
    </div>
  );
};

export const GameInfo = () => {
  return (
    <div className="game-info">
      <CountdownTimer secondsLeft={60} />
      <MatchesAndMistakes matches={9} mistakes={3} />
    </div>
  );
};
