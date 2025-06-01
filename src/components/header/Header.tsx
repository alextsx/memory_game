import { GameInfo } from './GameInfo';
import { Logo } from './Logo';
import { Menubar } from './menu/Menubar';

export const Header = () => {
  return (
    <header className="game-header">
      <Logo />
      <GameInfo />
      <Menubar />
    </header>
  );
};
