'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export const CardBack = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <motion.div
      className="card-back"
      initial={false}
      animate={{ scale: isHovered ? 1.075 : 1 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      <Image
        src="/assets/img/back.svg"
        width={81}
        height={130}
        alt="Non hovered card's back"
        className="absolute top-0 left-0 transition-opacity duration-200"
        style={{ opacity: isHovered ? 0 : 1 }}
      />

      <Image
        src="/assets/img/back_hovered.svg"
        width={81}
        height={130}
        alt="Hovered card's back"
        className="absolute top-0 left-0 transition-opacity duration-200"
        style={{ opacity: isHovered ? 1 : 0 }}
      />
    </motion.div>
  );
};
