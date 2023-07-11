import {Admin, AdminInterface, Session, SessionInterface} from 'models';
import bcrypt from "bcrypt";

export class SessionService {
    static async generateSession(name: string): Promise<SessionInterface | false> {
        return await Admin.create({
            name: name,
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
}