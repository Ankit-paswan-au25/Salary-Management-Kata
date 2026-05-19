const isTest = process.env.NODE_ENV === 'test';

export const env = {
  PORT: Number(process.env.PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  DB_PATH: process.env.DB_PATH ?? (isTest ? ':memory:' : './data/dev.sqlite'),
};
