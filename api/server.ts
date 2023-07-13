import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { adminRouter, exerciseRouter, userRouter } from 'routes';
import './databases/create.database';
import cookieParser from 'cookie-parser';
import { morganMiddleware } from 'middlewares';
import { DefaultErrorHandler } from 'middlewares/error.middleware';

const app = express();

dotenv.config();
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

app.use('/exercises', exerciseRouter);
app.use('/users', userRouter);
app.use('/admin', adminRouter);
app.use('/', (req, res) => {
  res.status(200).send();
});

app.use(DefaultErrorHandler);

app.listen(PORT, async () => {
  console.log(`\n🚀 Connecting on port\u001b[1;34m http://localhost:${PORT} \u001b[0m\n`);
});
