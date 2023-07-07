export namespace UserTypes {
  export interface Props {
    email: string;
    ssh: {
      host: string;
    };
    steps: boolean[];
  }
}
