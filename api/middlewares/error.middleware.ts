import { NextFunction, Request, Response } from 'express';
import { ApiError } from 'utils/errors/ApiError';
import { ErrorCode } from 'utils/errors/ErrorCode';


export const DefaultErrorHandler = async (error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  console.log(error.constructor.name);

  let err = new ApiError(ErrorCode.InternalError, 'auth/missing-email', 'An unknown internal error occurred');
    
  if (!!error) {
    if (error instanceof ApiError) {
      console.log('coucou');
      err = error;
    } 
    else if (!!error.sql) {
      // Ceci est une erreur envoyé par la base de données. On va supposer une erreur de la part de l'utilisateur
      // A faire : il est peut-être recommandé d'avoir un handler dédié aux erreurs SQL pour mieux trier celles qui sont de notre faute, et celles la faute de l'utilisateur.
      err = new ApiError(ErrorCode.BadRequest, 'sql/failed', error.message, {
        sqlState: error.sqlState,
        sqlCode: error.code
      });      
      // A noter : on ne renvoie pas le SQL pour ne pas divulger les informations secrets
    } else {
      if (error.message) {
        err.errMessage = error.message;
      }
    }
  }

  res.status(err.httpCode || ErrorCode.InternalError).json(err);
}
