// mounted in app.js with:  app.use('/api/events/:id/comments', commentsRouter)
import { Router } from 'express';
import * as comments from '../controllers/comments.controller.js';

export const commentsRouter = Router({ mergeParams: true });   // keep :id from the parent path

commentsRouter.get('/', comments.list);
commentsRouter.post('/', comments.create);
