'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Portal } from '@/hocs/Portal';
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
      <AnimatePresence>
        {isOpen && (
          <Portal selector="modal-root">
            <div className="modal">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="modal-overlay"
                onClick={handleClick}
              />
              <motion.div
                initial={{ y: '-100vh' }}
                animate={{ y: 0 }}
                exit={{ y: '-100vh' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <SettingsModalHeader onClose={handleClick} />
                <SettingsModalBody onSave={handleSave} />
              </motion.div>
            </div>
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
};
