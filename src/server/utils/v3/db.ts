import sequelize from '../../models/v3/db';
import { User, } from '../../models/v3/User';
import { Session, } from '../../models/v3/Session';

async function tryDb() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  }
  catch (error) {
    console.error('Unable to connect to the database:', error);
    sequelize.close();
    console.log('Connection has been destroy successfully.');
  }
}

export async function addBD(modelAndData) {
  tryDb();
  if (modelAndData.model === 'user') {
    const newUser = await User.create(
      { userName: modelAndData.userName, password: modelAndData.password, }
    );

    console.log(newUser);
    return true;
  }

  if (modelAndData.model === 'session') {
    const newSession = await Session.create(
      { userId: modelAndData.userId, }
    );
    console.log(newSession);
    return true;
  }

  return false;
}
