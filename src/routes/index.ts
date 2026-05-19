import { Express } from 'express';
import employeesRouter from './employees.routes';
import healthRouter from './health.routes';
import metricsRouter from './metrics.routes';

export function registerRoutes(app: Express): void {
  app.use('/health', healthRouter);
  app.use('/employees', employeesRouter);
  app.use('/metrics', metricsRouter);
}
