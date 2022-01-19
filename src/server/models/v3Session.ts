import Session from '../interfaces/Session';
import { getUUID, } from '../utils';

export function createSession(userId: string): Session {
  return {
    id: getUUID(),
    userId,
  };
}
