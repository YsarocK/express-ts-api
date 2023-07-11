import { Request, Response } from 'express';
import {SessionService} from "../services/session.service";
import {UserSessionService} from "../services/usersession.service";

export const createSession = async (req: Request<{}, {}, {name: string}, { }>, res: Response) => {
    const {name}: {name : string} = req.body;

    const session = await SessionService.generateSession(name)

    return res.status(200).json({
        session: session,
    })
}

export const updateSession = async (req: Request<{}, {}, {id: string, isActive:boolean}, { }>, res: Response) => {
    const {id, isActive}: {id : string, isActive : boolean} = req.body;

    const session = await SessionService.updateSession(id, isActive)

    return res.status(200).json({
        session: session,
    })
}

export const getAllSessions = async (req: Request, res: Response) => {

    const sessions = await SessionService.getAllSessions()

    return res.status(200).json({
        sessions: sessions,
    })
}

export const getAllUsersSessionById = async (req: Request<{session_id: string}, {}, {}, { }>, res: Response) => {
    const {session_id}: {session_id : string} = req.params;
    const users_sessions = await UserSessionService.getAllUsersSessionById(session_id)
    const session = await SessionService.getSessionById(session_id)

    return res.status(200).json({
        users_sessions: users_sessions,
        session: session
    })
}
