// logger.js – one pino instance for the whole app
import pino from 'pino';
import { config } from './config.js';

export const logger = pino({
  level: config.logLevel,
  // pretty, colored lines in development; plain JSON lines in production
  transport: config.isProduction ? undefined : { target: 'pino-pretty', options: { colorize: true, singleLine: true } },
});
