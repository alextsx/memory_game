import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SettingsModalHeader = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="modal-header">
      <h2>Game settings</h2>
      <button className="modal-close-btn" onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};
