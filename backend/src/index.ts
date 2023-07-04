import app from './app';

const bootstrap = () => {
  const PORT = process.env.PORT || 8888;

  // designates what port the app will listen to for incoming requests
  app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
  });
};

bootstrap();
