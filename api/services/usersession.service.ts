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

    static async updateUserSession(user_id: string, note: number ): Promise<UserSessionInterface | unknown> {
        return await UserSession.update({
            note: note,
            nb_try: sequelize.literal('nb_try + 1'),
        }, {
            where: {
                UserId: user_id
            }
        });
    }

    static async getUserSessionByUserIdAndSessionId(user_id: string, session_id: string ): Promise<UserSessionInterface | unknown> {
        return await UserSession.findOne({
            where: {
                UserId: user_id,
                SessionId: session_id
            }
        });
    }
}