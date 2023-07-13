import { sequelize } from './auth.database';
import 'models';
import { AdminService } from 'services';

sequelize
  .sync({ force: false })
  .then(() => {
    AdminService.generateAdmin(process.env.BASE_ADMIN_MAIL!, process.env.BASE_ADMIN_PASSWORD!)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  })
  .catch((err) => {
    console.log(err);
  });
