import { z } from 'zod';

export const Word = z.object({
  id: z.number(),
  word: z.string(),
  pos: z.enum(['noun', 'verb', 'adverb', 'adjective']),
});

// match JSON test file
export const WordCollection = z.object({
  wordList: z.array(Word),
});

export const WordCollectionResponse = z.object({
  words: z.array(Word),
});

export type Word = z.infer<typeof Word>;
export type WordPosition = z.infer<typeof Word>['pos'];
export type WordCollection = z.infer<typeof WordCollection>;
export type WordCollectionResponse = z.infer<typeof WordCollectionResponse>;
