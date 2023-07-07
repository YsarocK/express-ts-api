import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { exerciseRouter, userRouter } from 'routes';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3001;

const whitelist = process.env.CORS?.split(',') || [];
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin as string) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use('/exercises', exerciseRouter);
app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`\n🚀 Connecting on port\u001b[1;34m http://localhost:${PORT} \u001b[0m\n`);
});