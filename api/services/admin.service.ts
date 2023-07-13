import { Admin } from 'models/admin';
import bcrypt from 'bcrypt';
import { AdminTypes } from 'types';

export class AdminService {
  static generateAdmin(email: string, password: string): Promise<AdminTypes.Props | false> {
    return new Promise(async (resolve, reject) => {
      const admin = (await Admin.findOne({
        where: {
          email: email,
        },
      })) as AdminTypes.Props;

      if (admin) {
        reject('Admin already exist with this mail');
        return;
      }

      const saltRounds = 10;
      const hash = bcrypt.hashSync(password, saltRounds);

      const newAdmin = (await Admin.create({
        email: email,
        password: hash,
      })) as AdminTypes.Props;

      resolve(newAdmin);
    });
  }

  static getAdmin(email: string, password: string): Promise<AdminTypes.Props | string | false> {
    return new Promise(async (resolve, reject) => {
      const admin = (await Admin.findOne({
        where: {
          email: email,
        },
      })) as AdminTypes.Props;

      if (!admin) {
        reject('No admin user with this email');
        return;
      }

      const passwordValid = bcrypt.compareSync(password, admin.password);

      if (!passwordValid) {
        reject('Bad password');
        return;
      }

      resolve(admin);
    });
  }

  static async getAdminById(id: string): Promise<AdminTypes.Props | string | false> {
    return (await Admin.findOne({
      where: {
        id: id,
      },
    })) as AdminTypes.Props;
  }
}
