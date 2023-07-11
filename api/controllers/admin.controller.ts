import { Request, Response } from 'express';
import { SessionService } from 'services/session.service';
import { UserSessionService } from 'services/usersession.service';

export const getUserSessions = async (req: Request, res: Response) => {
    const {sessionId} = req.body;

    const userSessions = await UserSessionService.getUserSessions(sessionId);
    if(!userSessions) {
        return res.status(400).send("Invalid session");
    }

    return res.status(200).json(userSessions);
    
}