import { Request, Response } from 'express';
import { UserService } from 'services';
import { SessionService } from 'services/session.service';

export const sendUserMagicLink = async (req: Request, res: Response) => {
  const { session_id } = req.params;
  const mail = req.query.mail as string;

  if(!mail) {
    return res.status(400).json({ success: false, message: 'Mail is not given' });
  }

  console.log(session_id, mail);

  const session = await SessionService.getSession(session_id);

  if(!session) {
    return res.status(400).json({ success: false, message: 'Session does not exist' });
  }

  const user = await UserService.getUser(mail);

  if (!user) {
    return res.status(400).json({ success: false, message: 'User not found' });
  }

  return res.status(200).json({
    success: true,
    data: {
      token: user,
      link: 'Magic link',
    },
  });
};
