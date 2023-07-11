export namespace StoreType {
  export interface Main {
    user: {
      id: string,
      email: string,
      firstname: string,
      lastname: string,
    },
    user_session: {
      UserId?: string,
      SessionId?: string,
      id?: string,
      note?: number,
      nb_types?: number,
      ssh_ip?: string,
      ssh_user?: string,
    },
    session: {
      id?: string,
      name?: string,
    }
  }
}