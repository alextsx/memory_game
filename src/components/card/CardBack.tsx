'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export const CardBack = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <div className="card-back">
      <motion.div
        animate={{ scale: isHovered ? 1.025 : 1 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      >
        <Image
          src="/assets/img/back.svg"
          width={81}
          height={130}
          alt="Non hovered card's back"
          style={{ opacity: isHovered ? 0 : 1 }}
        />
      </motion.div>
      <motion.div
        animate={{ scale: isHovered ? 1.025 : 1 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      >
        <Image
          src="/assets/img/back_hovered.svg"
          width={81}
          height={130}
          alt="Hovered card's back"
          style={{ opacity: isHovered ? 1 : 0 }}
        />
      </motion.div>
    </div>
  );
};
