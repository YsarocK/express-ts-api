export namespace ExerciseTypes {
  export interface Result {
    name: string;
    passed: boolean;
    error?: string;
  }

  export namespace Verify {
    export interface Props {
      id: string;
      host: string;
      username: string;
    }
  }
}
