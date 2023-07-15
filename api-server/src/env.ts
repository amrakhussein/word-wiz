import { z } from 'zod';

export const envVariables = z.object({
  PORT: z.string().transform(Number),
});

envVariables.parse(process.env);

export const getEnvValidationIssues = (): z.ZodIssue[] | void => {
  const result = envVariables.safeParse(process.env);
  if (!result.success) return result.error.issues;
};
