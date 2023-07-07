import { Request, Response } from 'express';
import { getUserMagicLinkService } from 'services/user.service';

export const getUserMagicLink = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getUserMagicLinkService(id);

  if (!user) {
    return res.status(400).json({ success: false, message: 'User not found' });
  }

  return res.status(200).json({
    success: true,
    data: {
      id: user.id,
      link: 'Magic link',
    },
  });
};
