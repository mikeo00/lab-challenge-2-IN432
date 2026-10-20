import { Router } from 'express';
import * as events from '../controllers/events.controller.js';

export const categoriesRouter = Router();

categoriesRouter.get('/', events.categories);
