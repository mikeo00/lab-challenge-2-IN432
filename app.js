// app.js – assembles the application (exported so tests can import it later)
import express from 'express';
import pinoHttp from 'pino-http';
import { logger } from './logger.js';
import { requestId } from './middleware/request-id.js';
import { notFoundHandler } from './middleware/not-found.js';
import { errorHandler } from './middleware/error-handler.js';
import { eventsRouter } from './routes/events.routes.js';
import { categoriesRouter } from './routes/categories.routes.js';
import { commentsRouter } from './routes/comments.routes.js';

export const app = express();

app.use(requestId);
app.use(pinoHttp({
  logger,
  genReqId: (req) => req.id,
  // compact log lines: id, method, url, status, duration (pino-http adds responseTime)
  serializers: {
    req: (req) => ({ id: req.id, method: req.method, url: req.url }),
    res: (res) => ({ statusCode: res.statusCode }),
  },
}));
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));
app.use('/api/events/:id/comments', commentsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/categories', categoriesRouter);

app.use(notFoundHandler);
app.use(errorHandler);
