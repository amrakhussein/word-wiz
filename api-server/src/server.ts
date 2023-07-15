import { app } from './app';
import { getEnvValidationIssues } from './env';

// Ensure validated parsed env schema, Throws err if env schema violated `env.ts`
getEnvValidationIssues();

const PORT = process.env.PORT || 8888;
const baseUrl = `https://localhost:${PORT}`;

const bootstrap = () => {
  // designates what port the app will listen to for incoming requests
  app.listen(PORT, () => {
    console.log(`Server is running at ${baseUrl}`);
  });
};

bootstrap();
