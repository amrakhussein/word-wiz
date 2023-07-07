import { createExpressEndpoints, initServer } from '@ts-rest/express';
import cors from 'cors';
import express, { Express } from 'express';

import helmet from 'helmet';
import { contract } from './contract';
import getXRandomizedWords from './features/words/words.service';

export const app: Express = express();

// :: middlewares ::

// adding set of security middlewares
app.use(helmet());

// parse incoming requests of any type
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

// enable all CORS request
app.use(cors());

const s = initServer();

export const router = s.router(contract, {
  getWords: async ({ query: { pick } }) => {
    const fetchedRandomWords = await getXRandomizedWords(pick);
    return {
      status: 200,
      body: fetchedRandomWords,
    };
  },
});

createExpressEndpoints(contract, router, app, {
  responseValidation: true,
});
