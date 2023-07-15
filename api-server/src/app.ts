import { createExpressEndpoints, initServer } from '@ts-rest/express';
import cors from 'cors';
import express, { Express } from 'express';
import dotenv  from "dotenv"

import helmet from 'helmet';
import { contract } from './contract';
import getXRandomizedWords from './features/words/words.service';

dotenv.config()

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
    try {
      const fetchedRandomWords = await getXRandomizedWords(pick);
      return {
        status: 200,
        body: fetchedRandomWords,
      };
    } catch (error) {
      console.error('Error occurred:', error);
      return {
        status: 500,
        body: {
          message: 'Unexpected error occurred',
        },
      };
    }
  },
});

createExpressEndpoints(contract, router, app, {
  // responseValidation: true,
});

// app.use((err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
//   if (err instanceof ResponseValidationError) {
//     console.error(err.cause);
//   }

//   next(err);
// });

export default app;
