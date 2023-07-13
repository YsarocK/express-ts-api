import { Request, Response } from 'express';
import { ApiError } from 'utils/apiError';
import { ErrorCode } from 'utils/errors/ErrorCode';

export const DefaultErrorHandler = async (error: any, req: Request, res: Response) => {
  let err = new ApiError(
    ErrorCode.InternalError,
    'auth/missing-email',
    'An unknown internal error occurred',
  );

  if (!!error) {
    if (error instanceof ApiError) {
      err = error;
    } else if (!!error.sql) {
      err = new ApiError(ErrorCode.BadRequest, 'sql/failed', error.message, {
        sqlState: error.sqlState,
        sqlCode: error.code,
      });
    } else {
      if (error.message) {
        err.errMessage = error.message;
      }
    }
  }

  res.status(err.httpCode || ErrorCode.InternalError).json(err);
};
