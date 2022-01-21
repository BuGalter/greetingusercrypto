import { User, } from '../../models/v3/User';
import { Session, } from '../../models/v3/Session';

export async function addDbUser(userName: string, password: string): Promise<boolean> {
  /**
   * Function to add a user.
   * @param {string} userName - User name.
   * @param (string) password - User password.
   * @returns {boolean} Has a user been added.
   */
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
  /**
   * Function to add a session.
   * @param {string} userId - User id.
   * @returns {boolean} Has a user been added or {string} User id.
   */
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
  /**
   * Function to find user.
   * @param {string} userName - User name.
   * @param {string} password - User password.
   * @returns {boolean} If the user is not found or {string} User id.
   */
  const user = await User.findOne({ where: { userName, password, }, });
  if (!user) {
    return false;
  }

  return user.getDataValue('id');
}

export async function findDbUseById(userId: string) {
  /**
   * Function to find user by id.
   * @param {string} userId - User id.
   * @returns {boolean} If the user is not found or {string} User name.
   */
  const user = await User.findByPk(userId);
  if (!user) {
    return false;
  }

  return user.getDataValue('userName');
}
