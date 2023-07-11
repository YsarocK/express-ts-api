import {Admin} from 'models/admin'
import bcrypt from 'bcrypt'
import {generateRandomString} from 'utils';

export class AdminService {
    static async generateAdmin(email: string, password: string): Promise<{ user: object } | false> {
        if (email === null || password === null) {
            return false;
        }

        const saltRounds = 10;
        const hash = bcrypt.hashSync(password, saltRounds);

        const admin = await Admin.create({
            email: email,
            password: hash,
        });

        return {
            user: admin,
        };
    }

    static async getAdmin(email: string, password: string): Promise<{ admin: object } | string | false> {
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
        });

        if (admin === null) {
            return false
        } else {
            return {admin}
        }
    }
}