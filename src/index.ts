import 'dotenv/config';
import express from 'express';
import globalRouter from './global-router';
import { logger } from './logger';
import cron from "node-cron";
import saveLaptops from "./scrapping/saveLaptops";
import OpenAI from 'openai';
import connectDB from './connectdb';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(express.json());
app.use('/api/v1/', globalRouter);

app.listen(PORT, () => {
  console.log(`Server runs at http://localhost:${PORT}`);
});

async function runSaveLaptops() {
  console.log('Running saveLaptops on app launch');
  await saveLaptops();
}

connectDB()
    .then(() => runSaveLaptops())
    .catch(err => console.error('Error connecting to DB:', err));

cron.schedule('0 0 * * *', async () => {
  console.log('Running saveLaptops daily at midnight');
  await saveLaptops();
});

console.log('Cron job setup complete. Running saveLaptops every day at midnight.');