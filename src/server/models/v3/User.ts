import { DataTypes, Model, } from 'sequelize';
import { getUUID, } from '../../utils';
import sequelize from './db';

class User extends Model {}

User.init({
  id: {
    type: DataTypes.STRING, 
    defaultValue: () => getUUID(),
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { sequelize, modelName: 'User', });
