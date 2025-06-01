import { getAnimalNameByEmojiId, uniqueAnimalEmojis } from '@/constants/emojis';

type CardFrontProps = { animalId: number };

export const CardFront = ({ animalId }: CardFrontProps) => {
  return (
    <div className="card-front">
      <span role="img" aria-label={`Card: ${getAnimalNameByEmojiId(animalId)}`}>
        {uniqueAnimalEmojis[animalId]}
        <span className="sr-only">{getAnimalNameByEmojiId(animalId)}</span>
      </span>
    </div>
  );
};
