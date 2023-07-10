import {User} from 'models'
import {generateRandomString, generateToken} from 'utils';

class UserService {
    static async generateUser(email: string, firstname: string, lastname: string): Promise<{ user: object; token: string } | false> {
        if (email === null) {
            return false;
        }

        const user_id = generateRandomString(12);
        const token = generateToken(user_id);

        const user = await User.create({
            user_id: user_id,
            email: email,
            firstname: firstname,
            lastname: lastname,
        });

        return {
            user: user,
            token: token
        };
    }

    static async getUser(email: string): Promise<{ token: string } | string | false> {
        if (email === null) {
            return false;
        }

        const user = await User.findOne({
            where: {
                email: email,
            },
            attributes: ['user_id'],
        });

        const user_id = user?.getDataValue('user_id') ;
        if (user_id === null) {
            return false
        }

        return generateToken(user_id);
    }
}