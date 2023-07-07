//
// Shared HTTP Schema for client and backend
//
import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { WordCollection } from './features/words/words.schema'; // Schema need for shared validation

const c = initContract();

export const contract = c.router({
  getWords: {
    method: 'GET',
    path: '/words',
    query: z.object({
      pick: z
        .string()
        .transform((val) => Number(val))
        .optional(),
    }),
    responses: {
      200: WordCollection,
    },
    summary: 'Get random words where use can query picked words i.e. ?pick=10',
  },
});
