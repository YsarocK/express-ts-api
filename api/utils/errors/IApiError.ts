import { ErrorCode } from './errorcode';
import { StructuredErrors } from './structuredErrors';

export interface IApiError {
  code: ErrorCode,
  structured: StructuredErrors,
  message?: string,
  details?: any,
}