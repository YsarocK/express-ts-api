export namespace ExerciseTypes {
  export interface Result extends Meta {
    passed: boolean;
    error?: string;
  }

  export interface Meta {
    slug: string;
    title: string;
    description: string;
    points: number;
  }
}
