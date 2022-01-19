import { createUser, } from '../../models/v3User';
import { createSession, } from '../../models/v3Session';
import { output, } from '../../utils';
import { users, } from '../../../storage/users-data';

function checkParams(reqPayload) {
  if (!reqPayload.username || !reqPayload.password) {
    return false;
  }

  return true;
}

export async function greetingUser(r) {
  const len: number = users.length;
  for (let i = 0; i < len; i += 1) {
    if (users[i].id === r.params.id) {
      return output({ message: `Hi, ${ users[i].username }!`, });
    }
  }

  return output({ message: 'User undifened', });
}

export async function userRegistration(r) {
  const reqPayload = r.payload;
  if (checkParams(reqPayload)) {
    for (let index = 0; index < users.length; index += 1) {
      if (users[index].username === reqPayload.username
        && users[index].password === reqPayload.password) {
        return output({ message: `Hi, ${ users[index].username }!`, });
      }
    }

    users.push(createUser(reqPayload.username, reqPayload.password));
    return output({ message: 'User added!', });
  }

  console.log(users);
  return output({message: 'Wrong username or password!'});
}
