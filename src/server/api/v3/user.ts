import User from '../../interfaces/User';
import Session from '../../interfaces/Session';
import { output, getUUID, } from '../../utils';
import { users, } from '../../../storage/users-data';

export async function greetingUser(r) {
  const len: number = users.length;
  for (let i = 0; i < len; i += 1) {
    if (users[i].id === r.params.id) {
      return output({ message: `Hi, ${ users[i].name } ${ users[i].surname }!`, });
    }
  };
  return output({ message: 'User undifened', });
}
