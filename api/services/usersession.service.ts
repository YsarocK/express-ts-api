import { User, UserSession } from 'models';
import { sequelize } from 'databases';
import { UserSessionTypes } from 'types';

export class UserSessionService {
  static async generateUserSession(
    ssh_ip: string,
    ssh_user: string,
    UserId: string,
    SessionId: string,
  ): Promise<UserSessionTypes.Props> {
    return (await UserSession.create({
      note: 0,
      nb_try: 0,
      ssh_ip: ssh_ip,
      ssh_user: ssh_user,
      UserId: UserId,
      SessionId: SessionId,
    })) as UserSessionTypes.Props;
  }

  static async updateUserSession(
    user_id: string,
    note: number,
  ): Promise<UserSessionTypes.Props | unknown> {
    return await UserSession.update(
      {
        note: note,
        nb_try: sequelize.literal('nb_try + 1'),
      },
      {
        where: {
          UserId: user_id,
        },
      },
    );
  }

  static async getUserSessionByUserIdAndSessionId(
    user_id: string,
    session_id: string,
  ): Promise<UserSessionTypes.Props | unknown> {
    return await UserSession.findOne({
      where: {
        UserId: user_id,
        SessionId: session_id,
      },
    });
  }

  static async getAllUsersSessionById(
    session_id: string,
  ): Promise<UserSessionTypes.Props | unknown> {
    return await UserSession.findAll({
      where: {
        SessionId: session_id,
      },
      include: [{ model: User }],
    });
  }
}
