'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CardBack } from './CardBack';
import { CardFront } from './CardFront';

type CardProps = {
  animalId: number;
  //  isMatched: boolean;
};

export const Card = ({ animalId }: CardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="card"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={false}
      /* shadow on hover */
      animate={{ boxShadow: isHovered ? '0 1px 4px rgba(0, 0, 0, 0.2)' : 'none' }}
    >
      {isFlipped ? <CardFront animalId={animalId} /> : <CardBack isHovered={isHovered} />}
    </motion.div>
  );
};
