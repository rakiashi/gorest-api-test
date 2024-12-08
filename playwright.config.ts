import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment-specific .env file
const envFile = process.env.ENV === 'develop' ? '.env.develop' : '.env.prod';
dotenv.config({ path: path.resolve('enviornments', envFile) });
const workerCount = parseInt(process.env.WORKER_COUNT || '3', 10);

export default defineConfig({
  testDir: './api-test/tests',
  fullyParallel: true,
  retries: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  timeout: 30000, // Use timeout from env
  workers: workerCount, // Use worker count from env
});
