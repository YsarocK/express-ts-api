import {UserSession, UserSessionInterface} from 'models';
import {sequelize} from "databases";

export class UserSessionService {
    static async generateUserSession(ssh_ip: string, ssh_user: string, UserId: string, SessionId: string): Promise<UserSessionInterface> {
        return await UserSession.create({
            note: 0,
            nb_try: 0,
            ssh_ip: ssh_ip,
            ssh_user: ssh_user,
            UserId: UserId,
            SessionId: SessionId,
        }) as UserSessionInterface;
    }

    static async updateUserSession(user_id: string, note: string ): Promise<UserSessionInterface | unknown> {
        return await UserSession.update({
            note: note,
            nb_try: sequelize.literal('nb_try + 1'),
        }, {
            where: {
                UserId: user_id
            }
        });
    }
}