import { Sequelize, } from 'sequelize-typescript';

const sequelize = new Sequelize('cryptodb', 'cryptodb', '123', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize.sync();

export default sequelize;
