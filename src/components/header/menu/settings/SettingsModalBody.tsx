import React from 'react';

export const SettingsModalBody = ({ onSave }: { onSave: () => void }) => {
  return (
    <div className="modal-body">
      <div className="settings-option">
        <label htmlFor="pair-cards">Number of pair of cards</label>
        <input id="pair-cards" name="pair-cards" defaultValue={12} min={2} max={20} />
      </div>
      <div className="settings-option">
        <label htmlFor="countdown-time">Countdown time (sec.)</label>
        <input id="countdown-time" name="countdown-time" defaultValue={60} min={10} max={60} />
      </div>
      <button className="save-button" onClick={onSave}>
        Save Settings
      </button>
    </div>
  );
};
