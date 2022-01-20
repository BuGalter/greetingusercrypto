import { Sequelize, } from 'sequelize-typescript';
import { configDb, } from '../../config/v3/config';

const sequelize = new Sequelize(configDb.database, configDb.username, configDb.password, {
  host: configDb.host,
  dialect: 'postgres',
});

sequelize.sync();

export default sequelize;
