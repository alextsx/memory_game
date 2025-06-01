import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SettingsModalTrigger = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="menubar-item" onClick={onClick}>
      <FontAwesomeIcon icon={faGear} />
    </div>
  );
};
