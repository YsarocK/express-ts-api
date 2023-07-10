import { ExerciseTypes } from "./exercise.types";

export namespace ApiResponsesTypes {
  export interface Response<T> {
    success: boolean;
    data: T;
  }

  export interface Verify extends Response<{
    score: boolean
    tests: ExerciseTypes.Result;
  }> {}
}
