import { Session } from 'models';
import { SessionTypes } from 'types';

export class SessionService {
  static async generateSession(name: string): Promise<SessionTypes.Props | false> {
    return (await Session.create({
      name: name,
      isActive: true,
    })) as SessionTypes.Props;
  }

  static async getSessionById(id: string): Promise<SessionTypes.Props | string | false> {
    const session = (await Session.findOne({
      where: {
        id: id,
      },
    })) as SessionTypes.Props;

    if (!session) {
      return false;
    }

    return session;
  }

  static async updateSession(
    id: string,
    is_active: boolean,
  ): Promise<SessionTypes.Props | unknown> {
    return await Session.update(
      {
        isActive: is_active,
      },
      {
        where: {
          id: id,
        },
      },
    );
  }

  static async getAllSessions(): Promise<SessionTypes.Props | unknown> {
    return await Session.findAll();
  }
}
