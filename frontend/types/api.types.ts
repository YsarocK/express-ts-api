import { ExerciseTypes } from "./exercise.types";
import { StoreType } from "./store.type";

export namespace ApiResponsesTypes {
  export interface Response<T> {
    success: boolean;
    data: T;
  }

  export interface Verify extends Response<{
    score: number;
    tests: ExerciseTypes.Result;
  }> {}

  export interface Login extends StoreType.Main, Response<{
    redirect_url: string,
    tokens: {
      access: {
        token: string,
        expires: number
      }
      refresh: {
        token: string,
        expires: number
      }
    }
  }> {}
}
