import { Request, Response } from 'express';
import { SessionService, UserService, UserSessionService } from 'services';
import { JWToken, sendMailNodemailer } from 'utils';
import { UserTypes } from 'types';

export const sendUserMagicLink = async (req: Request, res: Response) => {
  const { session_id } = req.params;
  const body: UserTypes.Controller.MagicLink = req.body;

  if (!body.eleve.email) {
    return res.status(400).json({ success: false, message: 'Mail is not given' });
  }

  const session = await SessionService.getSessionById(session_id);

  if (!session) {
    return res.status(400).json({ success: false, message: 'Session does not exist' });
  }

  let user = await UserService.getUser(body.eleve.email);

  if (user === false) {
    user = await UserService.generateUser(body.eleve.email, body.eleve.prenom, body.eleve.nom);
  }

  let userSession = await UserSessionService.getUserSessionByUserIdAndSessionId(
    user.id,
    session_id,
  );

  if (!userSession) {
    userSession = await UserSessionService.generateUserSession(
      body.ssh.host,
      body.ssh.username,
      user.id,
      session_id,
    );
  }

  const mail_token = await JWToken.generateMagicToken(user.id, session_id);

  const link = process.env.FRONT + '/login?jwt=' + encodeURI(mail_token);

  sendMailNodemailer(link, body.eleve.email);

  return res.status(200).json({
    success: true,
    data: {
      token: mail_token,
      link: link,
    },
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

  const authTokens = await JWToken.generateAuthTokens(token_decoded.data.userId);

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

  const user_session = await UserSessionService.getUserSessionByUserIdAndSessionId(
    token_decoded.data.userId,
    token_decoded.data.sessionId!,
  );
  const user = await UserService.getUserById(token_decoded.data.userId);
  const session = await SessionService.getSessionById(token_decoded.data.sessionId!);

  return res.status(200).json({
    success: true,
    data: {
      user: user,
      user_session: user_session,
      session: session,
      redirect_url: `/${token_decoded.data.sessionId}/exercises`,
      tokens: authTokens,
    },
  });
};

export const refreshLoginTokens = async (req: Request, res: Response) => {
  const refresh_token: string = req.cookies['refresh-token'];

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
      tokens: authTokens,
    },
  });
};

export const check = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    data: {
      userId: res.locals.userId,
    },
  });
};
