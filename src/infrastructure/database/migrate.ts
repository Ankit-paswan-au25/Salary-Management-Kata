import fs from 'fs';
import path from 'path';
import { getDb } from './connection';

const MIGRATION_PATH = path.join(
  process.cwd(),
  'src/infrastructure/database/migrations/001_create_employees.sql',
);

export function getEmployeesMigrationSql(): string {
  return fs.readFileSync(MIGRATION_PATH, 'utf-8');
}

export function runMigrations(): void {
  getDb().exec(getEmployeesMigrationSql());
}
