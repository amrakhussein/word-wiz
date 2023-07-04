import { NextFunction, Request, Response } from 'express';

import { ZodError } from 'zod';
import RequestValidators from './interfaces/request-validator.interface';

export function validateRequest(validators: RequestValidators) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (validators.params) {
          req.params = await validators.params.parseAsync(req.params);
        }
        if (validators.body) {
          req.body = await validators.body.parseAsync(req.body);
        }
        if (validators.query) {
          req.query = await validators.query.parseAsync(req.query);
        }
        next();
      } catch (err) {
        if (err instanceof ZodError) {
          res.status(422);
        }
        next(err);
      }
    };
  }