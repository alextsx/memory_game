'use client';

import { useDispatch, useSelector } from 'react-redux';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { resetGame } from '@/redux/game.slice';
import { selectSettings } from '@/redux/settings.slice';
import { SettingsModal } from './settings/SettingsModal';

const ResetGameButton = () => {
  const dispatch = useDispatch();
  const settings = useSelector(selectSettings);
  const handleReset = () => {
    dispatch(resetGame(settings));
  };

  return (
    <div className="menubar-item" onClick={handleReset}>
      <FontAwesomeIcon icon={faRepeat} />
    </div>
  );
};

export const Menubar = () => {
  return (
    <div className="menubar">
      <SettingsModal />
      <ResetGameButton />
    </div>
  );
};
