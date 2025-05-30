import { uniqueAnimalEmojis } from './emojis';

//for now, this will be in redux later
export const DEFAULT_GAME_CONFIG = {
  TOTAL_PAIRS: 12,
  TIME_LIMIT: 60,
  MAX_GAME_PAIRS: uniqueAnimalEmojis.length
};
