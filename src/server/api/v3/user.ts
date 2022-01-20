import { createUser, } from '../../models/v3User';
import { createSession, } from '../../models/v3Session';
import { output, error, } from '../../utils';
import { users, } from '../../../storage/users-data';
import { sessions, } from '../../../storage/users-sessions';
import { decodeTokenJwt, createTokensJWT, } from '../../utils/v3/token';
import { checkParams, } from '../../utils/v3/validate';

async function findUser(username, password) {
  for (let i = 0; i < users.length; i += 1) {
    if (users[i].username === username && users[i].password === password) {
      return users[i];
    }
  }
}

async function validateSession(token: string) {
  const data = await decodeTokenJwt(token);
  if (!data) {
    return { isValide: false, };
  }

  for (let i = 0; i < sessions.length; i += 1) {
    if (data.sessionId === sessions[i].id && data.userId === sessions[i].userId) {
      return { isValide: true, userId: sessions[i].userId, };
    }
  }

  return { isValide: false, };
}

export async function greetingUser(r) {
  const token = r.headers.authorization;
  if (!token) {
    return error(403000, 'Access denied!', null);
  }

  const valide = await validateSession(token);
  if (valide.isValide) {
    for (let i = 0; i < users.length; i += 1) {
      if (users[i].id === valide.userId) {
        return output({ message: `Hi, ${ users[i].username }!`, });
      }
    }
  }

  return error(403000, 'Access denied!', null);
}

export async function userRegistration(r) {
  if (await checkParams(r.payload)) {
    if (await findUser(r.payload.username, r.payload.password)) {
      return output({ message: `Hi, ${ r.payload.username }!`, });
    }

    users.push(createUser(r.payload.username, r.payload.password));
    return output({ message: `${ r.payload.username } added!`, });
  }

  return error(403000, 'Wrong password or login!', null);
}

export async function userAuth(r) {
  if (await checkParams(r.payload)) {
    const user = await findUser(r.payload.username, r.payload.password);
    if (user !== undefined) {
      const session = createSession(user.id);
      sessions.push(session);
      const tokens = await createTokensJWT(session.id, session.userId);
      return output({message: `Access Token: ${tokens.access} Refresh Token: ${tokens.refresh}`, });
    }

    return error(404000, 'User not found!', null);
  }

  return error(404000, 'User not found!', null);
}
