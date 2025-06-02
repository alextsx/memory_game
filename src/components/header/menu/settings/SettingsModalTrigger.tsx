import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SettingsModalTrigger = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className="menubar-item"
      onClick={onClick}
      role="button"
      aria-label="Open Settings"
      title="Open Settings"
    >
      <FontAwesomeIcon icon={faGear} />
    </div>
  );
};
