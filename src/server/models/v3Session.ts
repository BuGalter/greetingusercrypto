import Session from '../interfaces/Session';
import { getUUID, } from '../utils';

export function createUser(userId: string): Session {
  return {
    id: getUUID(),
    userId,
  };
}
