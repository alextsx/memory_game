'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CardBack } from './CardBack';
import { CardFront } from './CardFront';

type CardProps = {
  animalId: number;
};

export const Card = ({ animalId }: CardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="card"
      animate={{
        rotateY: isFlipped ? 180 : 0,
        boxShadow: isHovered ? '0 1px 4px rgba(0, 0, 0, 0.2)' : 'none'
      }}
      initial={{ rotateY: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Back Card (shows first) */}
      <div className="card-flip">
        <CardBack isHovered={isHovered} />
      </div>

      {/* Front Card (shows after flip) */}
      <div className="card-flip">
        <CardFront animalId={animalId} />
      </div>
    </motion.div>
  );
};
