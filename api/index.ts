import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import UserController from './routes/UserController';
import ExercisesController from './routes/ExercisesController';

dotenv.config();

const app: Express = express();
app.use(express.json())
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('API is running 🚀');
});

app.use('/user', UserController);
app.use('/exercises', ExercisesController)

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});