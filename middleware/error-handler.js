import { logger } from '../logger.js';

// Four parameters: this is how Express recognises an error handler.
export function errorHandler(err, req, res, next) {
  const status = err.status ?? 500;
  if (status >= 500) logger.error({ err, requestId: req.id }, 'unhandled error');

  res.status(status).json({
    error: status >= 500 ? 'Internal server error' : err.message,
    ...(err.details && { details: err.details }),
    requestId: req.id,
  });
}
