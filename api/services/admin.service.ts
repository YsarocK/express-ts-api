import { Admin, AdminInterface } from 'models/admin'
import bcrypt from 'bcrypt'

export class AdminService {
  static generateAdmin(email: string, password: string): Promise<AdminInterface | false> {
    return new Promise(async (resolve, reject) => {
      const admin = await Admin.findOne({
        where: {
          email: email
        },
      }) as AdminInterface

      if (admin) {
        reject('Admin already exist with this mail');
        return;
      }

      const saltRounds = 10;
      const hash = bcrypt.hashSync(password, saltRounds);

      const newAdmin = await Admin.create({
        email: email,
        password: hash,
      }) as AdminInterface

      resolve(newAdmin);
    })
  }

  static getAdmin(email: string, password: string): Promise<AdminInterface | string | false> {
    return new Promise(async (resolve, reject) => {
      const admin = await Admin.findOne({
        where: {
          email: email
        },
      }) as AdminInterface

      if (!admin) {
        reject('No admin user with this email');
        return;
      }

      const passwordValid = bcrypt.compareSync(password, admin.password);

      if (!passwordValid) {
        reject('Bad password');
        return;
      }

      resolve(admin)
    })
  }

  static async getAdminById(id: string): Promise<AdminInterface | string | false> {
    return await Admin.findOne({
      where: {
        id: id,
      },
    }) as AdminInterface
  }
}