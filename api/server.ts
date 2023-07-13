import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { adminRouter, exerciseRouter, userRouter } from 'routes';
import './databases/create.database';
import cookieParser from 'cookie-parser';
import { DefaultErrorHandler, morganMiddleware } from 'middlewares';
import { logger } from 'utils';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const whitelist = process.env.CORS?.split(',') || [];
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin as string) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morganMiddleware);
app.use(cors(corsOptions));
//app.use(DefaultErrorHandler);

app.use('/exercises', exerciseRouter);
app.use('/users', userRouter);
app.use('/admin', adminRouter);
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the API',
  });
})

app.listen(PORT, async () => {
  logger.info(`Connecting on port http://localhost:${PORT}`);
});
