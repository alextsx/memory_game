import GameBoard from '@/components/GameBoard';
import { Header } from '@/components/header/Header';

//TODO css class for this
//TODO check h1-h3 usage in figma project

const MemoryGame = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-[30px] p-[50px] pt-[30px]">
        <Header />
        <GameBoard />
      </div>
    </>
  );
};

export default MemoryGame;
