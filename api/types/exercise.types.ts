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
      id: string;
      host: string;
      username: string;
    }
  }
}
