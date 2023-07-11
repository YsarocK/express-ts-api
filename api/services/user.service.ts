import {User} from 'models'
import {generateRandomString} from 'utils';
import {Model} from "sequelize";

export class UserService {
    static async generateUser(email: string, firstname: string, lastname: string): Promise<{ user: object } | false> {
        if (email === null) {
            return false;
        }

        const user = await User.create({
            email: email,
            firstname: firstname,
            lastname: lastname,
        });

        return {
            user: user,
        };
    }

    static async getUser(email: string): Promise<{ user: object } | string | false> {
        if (email === null) {
            return false;
        }

        const user = await User.findOne({
            where: {
                email: email,
            },
        });

        if (user === null) {
            return false
        } else {
            return {user}
        }
    }
}