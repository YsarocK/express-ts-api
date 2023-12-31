import express from 'express';
import {
  createSession,
  getAllSessions,
  getAllUsersSessionById,
  login,
  updateSession,
} from 'controllers';
import { AuthAdmin } from 'middlewares';

export const adminRouter = express.Router();

adminRouter.route('/get_all_session').get(AuthAdmin, getAllSessions);
adminRouter.route('/:session_id/users_sessions').get(AuthAdmin, getAllUsersSessionById);

adminRouter.route('/create_session').post(AuthAdmin, createSession);
adminRouter.route('/update_session').post(AuthAdmin, updateSession);
adminRouter.route('/login').post(login);
