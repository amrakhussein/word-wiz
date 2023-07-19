module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'eslint-config-prettier', // disables the formatting rules in ESLint that Prettier is going to be responsible for handling. Should be last
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'linebreak-style': 'off',
    'nonblock-statement-body-position': 'off',
    curly: 'off',
    'import/no-relative-packages': 'off',
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "import/prefer-default-export": "off",
    "react-hooks/exhaustive-deps": "off"
  },
};
