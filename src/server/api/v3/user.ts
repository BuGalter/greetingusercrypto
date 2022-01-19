import { createUser, } from '../../models/v3User';
import { createSession, } from '../../models/v3Session';
import { output, } from '../../utils';
import { users, } from '../../../storage/users-data';
import { sessions, } from '../../../storage/users-sessions';
import * as jwt from 'jsonwebtoken';

const tokenKeyAccess = '1a2b-3c4d-5e6f-7g8h';
const tokenKeyRefresh = '1a2b-3c4d-34tr-7g8h';

async function checkParams(payload) {
  if (!payload.username || !payload.password) {
    return false;
  }

  return true;
}

async function findUser(username, password) {
  for (let i = 0; i < users.length; i += 1) {
    if (users[i].username === username && users[i].password === password) {
      return users[i];
    }
  }
}

async function createTokensJWT(sessionId, userId) {
  const access = jwt.sign({ sessionId, userId, }, tokenKeyAccess, { expiresIn: 60 * 60, });
  const refresh = jwt.sign({ sessionId, userId, }, tokenKeyRefresh, { expiresIn: '10h', });
  return { access, refresh, };
}

async function decodeTokenJwt(token: string) {
  try {
    return jwt.verify(token, tokenKeyAccess);
  } catch (e) {
    console.log(e);
  }
}

async function validateSession(token: string) {
  const data = await decodeTokenJwt(token);
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
    return output({ message: 'Access denied!', });
  }

  const valide = await validateSession(token);
  if (valide.isValide) {
    for (let i = 0; i < users.length; i += 1) {
      if (users[i].id === valide.userId) {
        return output({ message: `Hi, ${ users[i].username }!`, });
      }
    }
  }

  return output({ message: 'Access denied!', });
}

export async function userRegistration(r) {
  if (await checkParams(r.payload)) {
    if (await findUser(r.payload.username, r.payload.password)) {
      return output({ message: `Hi, ${ r.payload.username }!`, });
    }

    users.push(createUser(r.payload.username, r.payload.password));
    return output({ message: `${ r.payload.username } added!`, });
  }

  return output({ message: 'Wrong password or login!', });
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

    return output({ message: 'User not found!', });
  }
}