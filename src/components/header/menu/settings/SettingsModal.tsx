'use client';

import { useState } from 'react';
import { Portal } from '@/hocs/portal';
import { SettingsModalBody } from './SettingsModalBody';
import { SettingsModalHeader } from './SettingsModalHeader';
import { SettingsModalTrigger } from './SettingsModalTrigger';

export const SettingsModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(!isOpen);
  const handleSave = () => {
    // Logic to save settings can be added here
    console.log('Settings saved');
    setIsOpen(false);
  };

  return (
    <>
      <SettingsModalTrigger onClick={handleClick} />
      {/*
       im using portal here to render it outside main app dom tree
       its useful for stuff like screen readers and parent z index wont affect this
      */}
      {isOpen && (
        <Portal selector="modal-root">
          <div className="modal">
            <div className="modal-overlay" onClick={handleClick} />
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <SettingsModalHeader onClose={handleClick} />
              <SettingsModalBody onSave={handleSave} />
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};
