import { ErrorTypes } from 'types';

export class ApiError extends Error {
  constructor(
    public httpCode: ErrorTypes.Code,
    public structuredError: ErrorTypes.Structured,
    public errMessage: string,
    public errDetails?: any,
  ) {
    super();
  }

  get json(): ErrorTypes.Api {
    return {
      code: this.httpCode,
      structured: this.structuredError,
      message: this.errMessage,
      details: this.errDetails,
    };
  }
}
