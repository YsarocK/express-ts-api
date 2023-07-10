import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (userId: string): string => {
  const payload = {
    user: userId,
  };

  return jwt.sign(payload, process.env.JWT_PRIVATE_KEY as string, {
    expiresIn: '24h',
  });
};
