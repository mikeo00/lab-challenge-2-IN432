import { Router } from 'express';
import * as events from '../controllers/events.controller.js';

export const eventsRouter = Router();

eventsRouter.get('/', events.list);
eventsRouter.get('/:id', events.getOne);
