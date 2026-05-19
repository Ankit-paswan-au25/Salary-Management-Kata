import { createApp } from './app';
import { env } from './config/env';
import { getDb } from './infrastructure/database/connection';
import { runMigrations } from './infrastructure/database/migrate';

const app = createApp();

getDb();
runMigrations();

app.listen(env.PORT, () => {
  console.log(`Server listening on port ${env.PORT}`);
});
