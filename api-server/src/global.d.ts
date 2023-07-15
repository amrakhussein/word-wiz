import { envVariables } from './env';

export {}; // make the file a module

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
