import { z } from 'zod';

const Word = z.object({
  id: z.number(),
  word: z.string(),
  pos: z.string(),
});

export const WordCollection = z.object({
  words: z.array(Word),
});

export type WordCollection = z.infer<typeof WordCollection>;

export type WordPosition = z.infer<typeof Word>['pos'];
