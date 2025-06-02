import { z } from 'zod';
import { MAXIMUM_ALLOWED_PAIRS } from '@/constants/emojis';

export const settingsSchema = z.object({
  pairs: z.number().min(8).max(MAXIMUM_ALLOWED_PAIRS),
  timeLimit: z.number().min(2),
  allowedMistakes: z.number().min(0),
  username: z.string().min(3).max(20)
});
