import { Card } from './card/Card';

const GameBoard = () => {
  return (
    <main className="game-board">
      {
        // Render 16 cards for the game board
        Array.from({ length: 24 }, (_, index) => (
          <Card key={index} animalId={index} />
        ))
      }
    </main>
  );
};

export default GameBoard;
