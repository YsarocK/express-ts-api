import { tokenTypes } from 'config/token';
import { Request, Response } from 'express';
import { UserService } from 'services';
import { SessionService } from 'services/session.service';
import { JWToken } from 'utils';
import { sendMailNodemailer } from '../utils/nodemailer';
import {UserSessionService} from "../services/usersession.service";

interface Form {
  eleve: {
    nom: string,
    prenom: string,
    email: string
  },
  ssh: {
    host: string,
    username: string
  }
}

export const sendUserMagicLink = async (req: Request, res: Response) => {
  const { session_id } = req.params;
  const body = req.body as Form;

  if (!body.eleve.email) {
    return res.status(400).json({ success: false, message: 'Mail is not given' });
  }

  console.log(session_id, body.eleve.email);

  /* const session = await SessionService.getSession(session_id);

  if(!session) {
    return res.status(400).json({ success: false, message: 'Session does not exist' });
  }
  */

  let user = await UserService.getUser(body.eleve.email);
  
  if (user === false) {
    //return res.status(400).json({ success: false, message: 'User not found' });
    //create user
    user = await UserService.generateUser(body.eleve.email, body.eleve.prenom, body.eleve.nom);
  }

  const mail_token = await JWToken.generateMagicToken(user.id, session_id);

  //create link with mail token
  const link = process.env.FRONT + '/login?jwt=' + encodeURI(mail_token);

  //send mail avec le link
  sendMailNodemailer(link, body.eleve.email);

  return res.status(200).json({
    success: true,
    data: {
      token: mail_token,
      link: link
    }
  });
};

export const loginUsingMagicLink = async (req: Request, res: Response) => {
  const token = req.query.jwt as string;

  if (!token) {
    return res.status(400).json({ success: false, message: 'Token is not given' });
  }

  let token_decoded;
  try {
    token_decoded = await JWToken.verifyToken(token);
  } catch (err) {
    return res.status(498).json({ success: false, message: err });
  }

  //add access and renew token to cookies
  const authTokens = await JWToken.generateAuthTokens(token_decoded.data.userId);

  //get user
  //const user = UserService.getUser()

  console.log(authTokens);

  res.cookie('token', authTokens.access.token, { expires: authTokens.access.expires, httpOnly: true, sameSite: 'lax', secure: false });
  res.cookie('refresh-token', authTokens.refresh.token, { expires: authTokens.refresh.expires, httpOnly: true, sameSite: 'lax', secure: false });

  const user_session = UserSessionService.getUserSessionByUserIdAndSessionId(token_decoded.data.userId, token_decoded.data.sessionId!)
  const user = UserService.getUserById(token_decoded.data.userId)
  const session = SessionService.getSessionById(token_decoded.data.sessionId!)

  return res.status(200).json({
    success: true,
    data: {
      user: user,
      user_session: user_session,
      session: session,
      redirect_url: `/${token_decoded.data.sessionId}/exercises`
    }
  })
}

export const refreshLoginTokens = async (req: Request, res: Response) => {
  const refresh_token = req.cookies['refresh-token'] as string;

  if (!refresh_token) {
    return res.status(400).json({ success: false, message: 'Refresh token is not given' });
  }

  let token_valid;
  try {
    token_valid = await JWToken.verifyToken(refresh_token);
  } catch (err) {
    return res.status(498).json({ success: false, message: err });
  }

  if (!token_valid.data.userId) {
    return res.status(498).json({ success: false, message: 'No userId in the token' });
  }

  const authTokens = await JWToken.generateAuthTokens(token_valid.data.userId);

  console.log(authTokens);

  res.cookie('token', authTokens.access.token, { expires: authTokens.access.expires, httpOnly: true, sameSite: 'lax', secure: false });
  res.cookie('refresh-token', authTokens.refresh.token, { expires: authTokens.refresh.expires, httpOnly: true, sameSite: 'lax', secure: false });

  return res.status(200).json({
    success: true
  })
}

export const check = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    data: {
      userId: res.locals.userId
    }
  })
}