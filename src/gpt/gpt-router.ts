import { Router } from 'express';
import GptService from './gpt-service';
import GptController from './gpt-controller';

const gptRouter = Router();

const gptService = new GptService();
const gptController = new GptController(gptService);

gptRouter.post('/laptops/', gptController.getLaptops);

export default gptRouter;
