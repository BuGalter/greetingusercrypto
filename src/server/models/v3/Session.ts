import { DataTypes, Model, } from 'sequelize';
import { getUUID, } from '../../utils';
import sequelize from './db';

export class Session extends Model {}

Session.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => getUUID(),
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { sequelize, modelName: 'Session', });
