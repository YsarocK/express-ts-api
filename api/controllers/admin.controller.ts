import { Request, Response } from 'express';
import {SessionService} from "../services/session.service";

export const createSession = async (req: Request<{}, {}, {name: string, isActive:boolean}, { }>, res: Response) => {
    const {name, isActive}: {name : string, isActive : boolean} = req.body;

    console.log(name)

    const session = await SessionService.generateSession(name, isActive)

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
