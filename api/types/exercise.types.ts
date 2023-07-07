export namespace ExerciseTypes {
  export interface Result {
    slug: string;
    title: string;
    description: string;
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
