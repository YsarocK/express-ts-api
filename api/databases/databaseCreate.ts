import { sequelize } from './databaseAuth';
import '../models';

sequelize
  .sync({ force: false })
  .then((result) => {
    console.log('result');
  })
  .catch((err) => {
    console.log(err);
  });
