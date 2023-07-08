import { ExerciseTypes } from "./exercise.types";

export namespace ApiResponsesTypes {
  export interface Verify {
    success: boolean;
    data: {
      score: number;
      tests: Array<ExerciseTypes.Result>
    }
  }
}
