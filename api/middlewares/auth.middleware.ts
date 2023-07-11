import { NextFunction, Request, Response } from "express";
import { JWToken } from "utils";

export const Auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.cookies.token;

    console.log(req.cookies.token);

    const userDoc = await JWToken.verifyToken(authToken);

    if(!userDoc.data || !userDoc.data.userId) {
      new Error('Bad Token delivered');
    }

    res.locals.userId = userDoc.data.userId;

    next();
  } catch (err) {
    next(err);
  }
}

export const AuthAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.cookies.token;

    const userDoc = await JWToken.verifyToken(authToken);

    if(!userDoc.data || !userDoc.data.userId) {
      new Error('Bad Token delivered');
    }

    if(!userDoc.data.isAdmin) {
      new Error('No admin rights');
    }

    res.locals.userId = userDoc.data.userId;

    next();
  } catch (err) {
    next(err);
  }
}