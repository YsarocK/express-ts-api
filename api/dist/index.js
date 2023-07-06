"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserController_1 = __importDefault(require("./routes/UserController"));
const ExercisesController_1 = __importDefault(require("./routes/ExercisesController"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send('API is running 🚀');
});
app.use('/user', UserController_1.default);
app.use('/exercises', ExercisesController_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
