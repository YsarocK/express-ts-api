export namespace ExerciseTypes {
  export interface Result {
    name: string;
    passed: boolean;
    error?: string;
  }

  export namespace Verify {
    export interface Props {
      host: string;
      username: string;
    }
  }
}
