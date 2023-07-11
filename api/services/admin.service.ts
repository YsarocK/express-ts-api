import {Admin, AdminInterface} from 'models/admin'
import bcrypt from 'bcrypt'

export class AdminService {
    static async generateAdmin(email: string, password: string): Promise<AdminInterface | false> {
        if (email === null || password === null) {
            return false;
        }

        const saltRounds = 10;
        const hash = bcrypt.hashSync(password, saltRounds);

        return await Admin.create({
            email: email,
            password: hash,
        }) as AdminInterface
    }

    static async getAdmin(email: string, password: string): Promise<AdminInterface | string | false> {
        if (email === null || password === null) {
            return false;
        }

        const saltRounds = 10;
        const hash = bcrypt.hashSync(password, saltRounds);

        const admin = await Admin.findOne({
            where: {
                email: email,
                password: hash,
            },
        }) as AdminInterface

        if (admin === null) {
            return false
        } else {
            return admin
        }
    }

    static async getAdminById(id: string): Promise<AdminInterface | string | false> {

        return await Admin.findOne({
            where: {
                id: id,
            },
        }) as AdminInterface
    }
}