import { getUserSessions } from 'controllers/admin.controller';
import express from 'express';
import { Auth, AuthAdmin } from 'middlewares/auth.middleware';

export const adminRouter = express.Router();

adminRouter.route("/admin/user-sessions").post(AuthAdmin, getUserSessions);