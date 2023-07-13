import { NextFunction, Request, Response } from 'express';
import { ApiError, JWToken } from 'utils';
import { ErrorTypes } from 'types';

export const Auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.cookies.token;

    const userDoc = await JWToken.verifyToken(authToken);

    if (!userDoc.data || !userDoc.data.userId) {
      throw new ApiError(
        ErrorTypes.Code.TokenExpired,
        'auth/invalid-access-token',
        'Access token expired. Try renew it with the renew token.',
      );
    }

    res.locals.userId = userDoc.data.userId;

    next();
  } catch (err) {
    next(err);
  }
};

export const AuthAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.cookies.token;

    const userDoc = await JWToken.verifyToken(authToken);

    if (!userDoc.data || !userDoc.data.userId) {
      throw new ApiError(
        ErrorTypes.Code.TokenExpired,
        'auth/invalid-access-token',
        'Access token expired. Try renew it with the renew token.',
      );
    }

    if (!userDoc.data.isAdmin) {
      throw new ApiError(ErrorTypes.Code.Unauthorized, 'auth/wrong-rights', 'No Admin Rights');
    }

    res.locals.userId = userDoc.data.userId;

    next();
  } catch (err) {
    next(err);
  }
};
