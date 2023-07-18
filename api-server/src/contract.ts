//
// Shared HTTP Schema for client and backend
//
import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { WordCollectionResponse } from './features/words/words.schema'; // Schema need for shared validation

const c = initContract();

export const contract = c.router({
  getWords: {
    method: 'GET',
    path: '/words',
    query: z.object({
      pick: z
        .string()
        .transform(Number)
        .optional(),
    }),
    responses: {
      200: WordCollectionResponse,
      // 400: z.object({ message: z.string() }),
    },
    summary: 'Get random words where user can query picked words i.e. ?pick=10',
  },
});
