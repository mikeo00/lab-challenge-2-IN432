// server.js – the only file that listens on a port
import { app } from './app.js';
import { config } from './config.js';
import { logger } from './logger.js';

app.listen(config.port, () => {
  logger.info(`CampusEvents API (${config.nodeEnv}) listening on http://localhost:${config.port}`);
});
