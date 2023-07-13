import { Request, Response } from 'express';
import { SessionService } from '../services/session.service';
import { UserSessionService } from '../services/userSession.service';
import { AdminService } from 'services';
import { JWToken } from 'utils';
import { AdminTypes } from 'types/admin.types';

export const createSession = async (req: Request, res: Response) => {
  const { name }: AdminTypes.Controller.Create = req.body;

  const session = await SessionService.generateSession(name);

  return res.status(200).json({
    session: session,
  });
};

export const updateSession = async (req: Request, res: Response) => {
  const { id, isActive }: AdminTypes.Controller.Update = req.body;

  const session = await SessionService.updateSession(id, isActive);

  return res.status(200).json({
    session: session,
  });
};

export const getAllSessions = async (req: Request, res: Response) => {
  const sessions = await SessionService.getAllSessions();

  return res.status(200).json({
    sessions: sessions,
  });
};

export const getAllUsersSessionById = async (req: Request, res: Response) => {
  const { session_id } = req.params;

  const users_sessions = await UserSessionService.getAllUsersSessionById(session_id);
  const session = await SessionService.getSessionById(session_id);

  return res.status(200).json({
    users_sessions: users_sessions,
    session: session,
  });
};

export const login = async (req: Request, res: Response) => {
  try {
    const body: AdminTypes.Controller.Login = req.body;

    const admin = (await AdminService.getAdmin(body.email, body.password)) as AdminTypes.Props;

    if (!admin) {
      return res
        .status(400)
        .json({ success: false, message: 'No admin found for these credentials' });
    }

    const authTokens = await JWToken.generateAuthTokens(admin.id, true);

    res.cookie('token', authTokens.access.token, {
      expires: authTokens.access.expires,
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
    });

    res.cookie('refresh-token', authTokens.refresh.token, {
      expires: authTokens.refresh.expires,
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
    });

    return res.status(200).json({
      success: true,
      data: {
        admin: admin,
        tokens: authTokens,
      },
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err });
  }
};
