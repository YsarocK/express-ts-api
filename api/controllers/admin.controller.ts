import { Request, Response } from 'express';
import { SessionService } from "../services/session.service";
import { UserSessionService } from "../services/usersession.service";
import { AdminService } from 'services';
import { JWToken } from 'utils';
import { AdminInterface } from 'models';

export const createSession = async (req: Request<{}, {}, { name: string }, {}>, res: Response) => {
  const { name }: { name: string } = req.body;

  console.log(name)

  const session = await SessionService.generateSession(name)

  return res.status(200).json({
    session: session,
  })
}

export const updateSession = async (req: Request<{}, {}, { id: string, isActive: boolean }, {}>, res: Response) => {
  const { id, isActive }: { id: string, isActive: boolean } = req.body;

  const session = await SessionService.updateSession(id, isActive)

  return res.status(200).json({
    session: session,
  })
}

export const getAllSessions = async (req: Request, res: Response) => {

  const sessions = await SessionService.getAllSessions()

  return res.status(200).json({
    sessions: sessions,
  })
}

export const getAllUsersSessionById = async (req: Request<{ session_id: string }, {}, {}, {}>, res: Response) => {
  const { session_id }: { session_id: string } = req.params;
  const users_sessions = await UserSessionService.getAllUsersSessionById(session_id)

  return res.status(200).json({
    users_sessions: users_sessions,
  })
}

interface LoginForm {
  email: string,
  password: string
}

export const login = async (req: Request, res: Response) => {
  try {

    const body = req.body as LoginForm;

    const admin = await AdminService.getAdmin(body.email, body.password) as AdminInterface;

    if (!admin) {
      return res.status(400).json({ success: false, message: 'No admin found for these credentials' });
    }

    const authTokens = await JWToken.generateAuthTokens(admin.id, true);

    res.cookie('token', authTokens.access.token, { expires: authTokens.access.expires, httpOnly: true, sameSite: 'lax', secure: false });
    res.cookie('refresh-token', authTokens.refresh.token, { expires: authTokens.refresh.expires, httpOnly: true, sameSite: 'lax', secure: false });

    return res.status(200).json({
      success: true,
      data: {
        admin: admin,
        tokens: authTokens
      }
    })
  } catch (err) {
    return res.status(400).json({ success: false, message: err });
  }
}