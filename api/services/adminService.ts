import { Admin } from 'models/admin'
import bcrypt from 'bcrypt'
import {generateRandomString, generateToken} from 'utils';

class AdminService {
    static async generateAdmin(email: string, password: string): Promise<{ user: object; token: string } | false> {
        if (email === null || password === null) {
            return false;
        }

        const saltRounds = 10;
        const hash = bcrypt.hashSync(password, saltRounds);

        const user_id = generateRandomString(12);
        const token = generateToken(user_id);

        const admin = await Admin.create({
            email: email,
            password: hash,
            user_id: user_id,
        });

        return { user: admin, token: token };
    }
}