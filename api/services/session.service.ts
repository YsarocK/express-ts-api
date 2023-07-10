import {Session} from 'models';

export class SessionService {
    static async getSession(id: string): Promise<{ token: string } | string | false> {
        if (id === null) {
            return false;
        }

        const session = await Session.findOne({
            where: {
                id: id,
            },
            attributes: ['name'],
        });

        if(!session) {
            return false;
        }

        return JSON.stringify(session);
    }
}