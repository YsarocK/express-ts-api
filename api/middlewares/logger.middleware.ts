import morgan, { StreamOptions } from 'morgan';
import { logger } from 'utils';

const stream: StreamOptions = {
  write: (message) => logger.http(message),
};

const skip = () => {
  return process.env.NODE_ENV !== 'development';
};

export const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip },
);
