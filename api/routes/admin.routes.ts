import express from 'express';
import {createSession, getAllSessions, getAllUsersSessionById, updateSession} from "../controllers/admin.controller";

export const adminRouter = express.Router();

adminRouter.route('/create_session').post(createSession);
adminRouter.route('/update_session').post(updateSession);
adminRouter.route('/get_all_session').get(getAllSessions);
adminRouter.route('/:session_id/users_sessions').get(getAllUsersSessionById);
