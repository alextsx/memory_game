'use client';

import { useEffect, useState } from 'react';
import { CardBack } from './CardBack';
import { CardFront } from './CardFront';

type CardProps = {
  animalId: number;
  //  isMatched: boolean;
};

export const Card = ({ animalId }: CardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsHovered(Math.random() < 0.5);
  }, []);

  useEffect(() => {
    if (animalId > 10) {
      setIsFlipped(Math.random() < 0.5);
    }
  }, [animalId]);

  return (
    <div className="card">
      {isFlipped ? <CardFront animalId={animalId} /> : <CardBack isHovered={isHovered} />}
    </div>
  );
};
