import { createUser, } from '../../models/v3User';
import { createSession, } from '../../models/v3Session';
import { output, } from '../../utils';
import { users, } from '../../../storage/users-data';

export async function greetingUser(r) {
  const len: number = users.length;
  for (let i = 0; i < len; i += 1) {
    if (users[i].id === r.params.id) {
      return output({ message: `Hi, ${ users[i].username }!`, });
    }
  };
  return output({ message: 'User undifened', });
}
