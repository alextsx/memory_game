'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { CardBack } from './CardBack';
import { CardFront } from './CardFront';

type CardProps = {
  emojiId: number;
  isFlipped: boolean;
  onClick: () => void;
  className?: string;
};

export const Card = ({ emojiId, isFlipped, onClick, className }: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn('card', className)}
      animate={{
        rotateY: isFlipped ? 180 : 0,
        boxShadow: isHovered ? '0 2px 15px rgba(0, 0, 0, 0.2)' : '  0px 2px 1px rgba(0, 0, 0, 0.15)'
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
        <CardFront animalId={emojiId} />
      </div>
    </motion.div>
  );
};
