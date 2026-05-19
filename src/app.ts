import express, { Express } from 'express';
import { registerRoutes } from './routes';

export function createApp(): Express {
  const app = express();
  app.use(express.json());
  registerRoutes(app);
  return app;
}
