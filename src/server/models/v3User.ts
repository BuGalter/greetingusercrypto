import User from '../interfaces/User';
import { getUUID, } from '../utils';

export function createUser(username: string, password: string): User {
  return {
    id: getUUID(),
    username,
    password,
  };
}
