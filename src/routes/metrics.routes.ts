import { Router } from 'express';
import {
  getCountryMetrics,
  getJobTitleMetrics,
} from '../controllers/metrics.controller';

const metricsRouter = Router();

metricsRouter.get('/countries/:country', getCountryMetrics);
metricsRouter.get('/job-titles/:jobTitle', getJobTitleMetrics);

export default metricsRouter;
