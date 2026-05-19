import { createApp } from './app';
import { env } from './config/env';
import { getDb } from './infrastructure/database/connection';

const app = createApp();

getDb();

app.listen(env.PORT, () => {
  console.log(`Server listening on port ${env.PORT}`);
});
