import { User, UserInterface } from 'models';

export class UserService {
    static async generateUser(email: string, firstname: string, lastname: string): Promise<UserInterface> {
        const user = await User.create({
            email: email,
            firstname: firstname,
            lastname: lastname,
        }) as UserInterface;

        return user;
    }

    static async getUser(email: string): Promise<UserInterface | false> {
        if (email === null) {
            return false;
        }

        const user = await User.findOne({
            where: {
                email: email,
            },
        }) as UserInterface;

        if (user === null) {
            return false
        } else {
            return user;
        }
    }
}