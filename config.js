// config.js – the ONLY place that reads process.env
const env = process.env;

export const config = Object.freeze({
  port: Number(env.PORT ?? 3000),
  nodeEnv: env.NODE_ENV ?? 'development',
  logLevel: env.LOG_LEVEL ?? 'info',
  isProduction: env.NODE_ENV === 'production',
});
