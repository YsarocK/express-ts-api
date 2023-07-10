import { NextFunction, Request, Response } from "express";
import { JWToken } from "utils";

export const Auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.cookies.token;

    const userDoc = await JWToken.verifyToken(authToken);

    if(!userDoc.sub) {
      new Error('Bad Token delivered');
    }

    res.locals.userId = userDoc.sub;

    next();
  } catch (err) {
    next(err);
  }
}