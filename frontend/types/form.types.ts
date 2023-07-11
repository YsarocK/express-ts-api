export namespace FormTypes {
  export interface Register {
    eleve: {
      nom: string,
      prenom: string,
      email: string
    },
    ssh: {
      host: string,
      username: string
    }
  }
}