import { User, } from '../../models/v3/User';
import { Session, } from '../../models/v3/Session';

export async function addDbUser(userName: string, password: string): Promise<boolean> {
  try {
    const newUser = await User.create({ userName, password, });
    console.log(newUser);
    return true;
  }
  catch (error) {
    console.log('Error to add user to db', error);
    return false;
  }
}

export async function addDbSession(userId: string) {
  try {
    const newSession = await Session.create({ userId, });
    console.log(newSession);
    return newSession.getDataValue('id');
  }
  catch (error) {
    console.log('Error to add user to db', error);
    return false;
  }
}

export async function findDbUser(userName: string, password: string) {
  const user = await User.findOne({ where: { userName, password, }, });
  if (!user) {
    return false;
  }

  return user.getDataValue('id');
}

export async function findDbUseById(userId: string) {
  const user = await User.findByPk(userId);
  if (!user) {
    return false;
  }

  return user.getDataValue('userName');
}
