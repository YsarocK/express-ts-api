import { tokenTypes } from 'config/token';
import { Request, Response } from 'express';
import { UserService } from 'services';
import { SessionService } from 'services/session.service';
import { JWToken } from 'utils';
import { sendMailNodemailer } from '../utils/nodemailer';

export const sendUserMagicLink = async (req: Request, res: Response) => {
  const { session_id } = req.params;
  const mail = req.query.mail as string;

  if (!mail) {
    return res.status(400).json({ success: false, message: 'Mail is not given' });
  }

  console.log(session_id, mail);

  /* const session = await SessionService.getSession(session_id);

  if(!session) {
    return res.status(400).json({ success: false, message: 'Session does not exist' });
  }

  const user = await UserService.getUser(mail);

  if (!user) {
    return res.status(400).json({ success: false, message: 'User not found' });
  } */

  const mail_token = await JWToken.generateMagicToken(mail);

  //create link with mail token
  const link = process.env.FRONT + '/users/login?jwt=' + mail_token;

  //send mail avec le link
  sendMailNodemailer(link, mail);

  return res.status(200).json({
    success: true,
    data: {
      token: mail_token,
      link: link
    }
  });
};

export const loginUsingMagicLink = async (req: Request, res: Response) => {
  const token = req.query.token as string;

  if (!token) {
    return res.status(400).json({ success: false, message: 'Token is not given' });
  }

  let token_decoded;
  try {
    token_decoded = await JWToken.verifyToken(token);
  } catch (err) {
    return res.status(498).json({ success: false, message: err });
  }

  console.log(token_decoded);

  //add access and renew token to cookies

  const authTokens = await JWToken.generateAuthTokens(token_decoded.sub!);

  console.log(authTokens);

  res.cookie('token', authTokens.access.token, { expires: authTokens.access.expires, httpOnly: true, sameSite: 'lax', secure: false });
  res.cookie('refresh-token', authTokens.refresh.token, { expires: authTokens.refresh.expires, httpOnly: true, sameSite: 'lax', secure: false });

  return res.status(200).json({
    success: true,
    data: {
      user_id: token_decoded.sub
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

  if (!token_valid.sub) {
    return res.status(498).json({ success: false, message: 'No userId in the token' });
  }

  const authTokens = await JWToken.generateAuthTokens(token_valid.sub!);

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