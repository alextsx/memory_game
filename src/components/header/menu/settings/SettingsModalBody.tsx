import { SettingsInput } from './SettingsInput';

export const SettingsModalBody = ({ onSave }: { onSave: () => void }) => {
  return (
    <div className="modal-body">
      <SettingsInput
        label="Number of pair of cards"
        id="pair-cards"
        type="number"
        min={2}
        max={20}
      />
      <SettingsInput
        label="Countdown time (sec.)"
        id="countdown-time"
        type="number"
        min={10}
        max={60}
      />
      <SettingsInput
        label="Allowed mistakes"
        id="allowed-mistakes"
        type="number"
        min={0}
        max={10}
      />
      <SettingsInput label="Username" id="username" type="text" maxLength={20} />
      <button className="save-button" onClick={onSave}>
        Save Settings
      </button>
    </div>
  );
};
