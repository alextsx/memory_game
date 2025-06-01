import { faRepeat } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SettingsModal } from './settings/SettingsModal';

export const Menubar = () => {
  return (
    <div className="menubar">
      <SettingsModal />
      <div className="menubar-item">
        <FontAwesomeIcon icon={faRepeat} />
      </div>
    </div>
  );
};
