import {Session, SessionInterface} from 'models';

export class SessionService {
    static async generateSession(name: string, isActive: boolean): Promise<SessionInterface | false> {
        return await Session.create({
            name: name,
            isActive: isActive,
        }) as SessionInterface
    }

    static async getSessionById(id: string): Promise<SessionInterface | string | false> {
        const session = await Session.findOne({
            where: {
                id: id,
            },
        }) as SessionInterface;

        if(!session) {
            return false;
        }

        return session;
    }

    static async updateSession(id : string, is_active: boolean): Promise<SessionInterface | unknown> {
        return await Session.update({
            isActive : is_active
        }, {
            where: {
                id: id
            }
        });
    }

    static async getAllSessions(): Promise<SessionInterface | unknown> {
        return await Session.findAll()
    }
}