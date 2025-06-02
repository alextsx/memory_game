import { uniqueAnimalEmojis } from '@/constants/emojis';
import { Card } from '@/redux/game.types';

export const generateCards = (pairs: number): Card[] => {
  //i create pairs of cards with the same emojiId &flatten the array
  const cards = Array.from({ length: pairs }, (_, emojiId) => [
    { emojiId, isMatched: false, isFlipped: false },
    { emojiId, isMatched: false, isFlipped: false }
  ]).flat();

  //shuffling in random order
  return shuffleArray(cards);
};

export const shuffleArray = <T>(array: T[]): T[] => {
  return array.sort(() => Math.random() - 0.5);
};

export const getEmojiByEmojiId = (emojiId: number): string => {
  if (!uniqueAnimalEmojis[emojiId]) {
    console.warn(`Emoji with ID ${emojiId} does not exist.`);
    return '❓';
  }
  return uniqueAnimalEmojis[emojiId];
};

export const getMaximumAllowedPairs = (): number => {
  return uniqueAnimalEmojis.length;
};
