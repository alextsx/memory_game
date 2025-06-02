// Adjust path as needed
import { uniqueAnimalEmojis } from '@/constants/emojis';
import { generateCards, getEmojiByEmojiId, shuffleArray } from './card-utils';

describe('generateCards', () => {
  it('should generate the correct number of cards', () => {
    const pairs = 5;
    const result = generateCards(pairs);
    expect(result.length).toBe(pairs * 2);
  });

  it('should create pairs with the same emojiId', () => {
    const pairs = 3;
    const result = generateCards(pairs);
    const emojiIds = result.map((card) => card.emojiId);
    // For each emojiId, count should be 2 (since it's a pair)
    // Explicitly type emojiIdCounts as a Record<number, number>
    const emojiIdCounts: Record<number, number> = {};
    emojiIds.forEach((id) => {
      emojiIdCounts[id] = (emojiIdCounts[id] || 0) + 1;
    });
    Object.values(emojiIdCounts).forEach((count) => {
      expect(count).toBe(2);
    });
    // Number of unique emojiIds should be equal to pairs
    const uniqueEmojiIds = new Set(emojiIds);
    expect(uniqueEmojiIds.size).toBe(pairs);
  });

  it('should have cards with correct initial state', () => {
    const pairs = 1;
    const result = generateCards(pairs);
    result.forEach((card) => {
      expect(card.isMatched).toBe(false);
      expect(card.isFlipped).toBe(false);
    });
  });
});

describe('shuffleArray', () => {
  it('should return an array of the same length', () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(arr);
    expect(shuffled.length).toBe(arr.length);
  });

  it('should contain the same elements as the input', () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(arr);
    expect(shuffled.sort()).toEqual(arr.sort());
  });

  it('should not always return the original order (probabilistic)', () => {
    const arr = Array.from({ length: 100 }, (_, i) => i + 1);
    let isSame = true;
    // Try up to 20 times, can actually fail but its ok
    // probably a bad unit test case
    for (let i = 0; i < 20; i++) {
      const shuffled = shuffleArray([...arr]);
      if (shuffled.some((val, idx) => val !== arr[idx])) {
        isSame = false;
        break;
      }
    }
    expect(isSame).toBe(false);
  });

  it('should shuffle an empty array', () => {
    const arr: number[] = [];
    const shuffled = shuffleArray(arr);
    expect(shuffled).toEqual([]);
  });
});

describe('getEmojiByEmojiId', () => {
  it('should return the correct emoji for a valid emojiId', () => {
    const emojiId = 0;
    const result = getEmojiByEmojiId(emojiId);
    expect(result).toBe(uniqueAnimalEmojis[emojiId]);
  });

  it('should return a question mark for an invalid emojiId', () => {
    const emojiId = uniqueAnimalEmojis.length;
    const result = getEmojiByEmojiId(emojiId);
    expect(result).toBe('❓');
  });
});
