import { User } from 'models';
import { UserTypes } from 'types';

export class UserService {
  static async generateUser(
    email: string,
    firstname: string,
    lastname: string,
  ): Promise<UserTypes.Props> {
    return (await User.create({
      email: email,
      firstname: firstname,
      lastname: lastname,
    })) as UserTypes.Props;
  }

  static async getUser(email: string): Promise<UserTypes.Props | false> {
    4;
    const user = (await User.findOne({
      where: {
        email: email,
      },
    })) as UserTypes.Props;

    if (user === null) {
      return false;
    } else {
      return user;
    }
  }
  static async getUserById(id: string): Promise<UserTypes.Props | false> {
    return (await User.findOne({
      where: {
        id: id,
      },
    })) as UserTypes.Props;
  }
}
