import {User, UserInterface} from 'models';

export class UserService {
    static async generateUser(email: string, firstname: string, lastname: string): Promise<UserInterface> {
        return await User.create({
            email: email,
            firstname: firstname,
            lastname: lastname,
        }) as UserInterface;
    }

    static async getUser(email: string): Promise<UserInterface | false> {4
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
    static async getUserById(id: string): Promise<UserInterface | false> {
        return await User.findOne({
            where: {
                id: id,
            },
        }) as UserInterface;
    }
}