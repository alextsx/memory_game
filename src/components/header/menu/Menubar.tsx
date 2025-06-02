'use client';

import { useDispatch, useSelector } from 'react-redux';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAlert } from '@/hocs/AlertProvider';
import { resetGame } from '@/redux/game.slice';
import { selectSettings } from '@/redux/settings.slice';
import { SettingsModal } from './settings/SettingsModal';

const ResetGameButton = () => {
  const dispatch = useDispatch();
  const settings = useSelector(selectSettings);
  const { show: showAlert } = useAlert();
  const handleReset = () => {
    dispatch(resetGame(settings));
    showAlert({
      message: 'Game has been reset to saved settings and cards have been shuffled.',
      title: 'Game Reset',
      variant: 'constructive'
    });
  };

  return (
    <div
      className="menubar-item"
      onClick={handleReset}
      role="button"
      aria-label="Reset Game"
      title="Reset Game"
    >
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
