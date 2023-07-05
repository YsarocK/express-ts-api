import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import UserController from './routes/UserController';
import StepsController from './routes/StepsController';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('API is running 🚀');
});

app.use('/user', UserController);
app.use('/steps', StepsController)

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});