export namespace ErrorTypes {
  export type Structured =
    // SQL
    | 'sql/failed'
    | 'sql/not-found'

    // Crud
    | 'validation/failed'

    // Authorization
    | 'auth/missing-email'
    | 'auth/unknown-email'
    | 'auth/missing-magic-link-token'
    | 'auth/invalid-magic-link-token'
    | 'auth/missing-header'
    | 'auth/access-token-expired'
    | 'auth/invalid-access-token'
    | 'auth/wrong-rights'

    // Default
    | 'internal/unknown';

  export enum Code {
    NotFound = 404,
    Unauthorized = 403,
    BadRequest = 400,
    TokenExpired = 410,
    TooManyRequests = 429,
    InternalError = 500,
  }

  export interface Api {
    code: Code;
    structured: Structured;
    message?: string;
    details?: any;
  }
}
