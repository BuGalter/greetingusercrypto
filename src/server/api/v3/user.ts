import { createUser, } from '../../models/v3User';
import { createSession, } from '../../models/v3Session';
import { output, } from '../../utils';
import { users, } from '../../../storage/users-data';
import { sessions, } from '../../../storage/users-sessions';
import * as jwt from 'jsonwebtoken';
import { decode } from 'querystring';

const tokenKey = '1a2b-3c4d-5e6f-7g8h';

function checkParams(payload) {
  if (!payload.username || !payload.password) {
    return false;
  }

  return true;
}

function findUser(username, password) {
  for (let i = 0; i < users.length; i += 1) {
    if (users[i].username === username && users[i].password === password) {
      return users[i];
    }
  }
}

function createTokensJWT(sessionId, userId) {
  const access = jwt.sign({ sessionId, userId, }, tokenKey, { expiresIn: 60 * 60, });
  const refresh = jwt.sign({ sessionId, userId, }, tokenKey, { expiresIn: '10h', });
  return { access, refresh, };
}

function decodeJwt(token: string) {
  try {
    return jwt.verify(token, tokenKey);
  } catch (e) {
    console.log(e);
  }
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
  const payload = r.payload;
  if (checkParams(payload)) {
    if (findUser(payload.username, payload.password)) {
      console.log(users);
      return output({ message: `Hi, ${ payload.username }!`, });
    }

    users.push(createUser(payload.username, payload.password));
    console.log(users);
    return output({ message: `${ payload.username } added!`, });
  }

  console.log(users);
  return output({ message: 'Wrong password or login!', });
}

export async function userAuth(r) {
  const payload = r.payload;
  if (checkParams(payload)) {
    const user = findUser(payload.username, payload.password);
    if (user !== undefined) {
      const session = createSession(user.id);
      sessions.push(session);
      const tokens = createTokensJWT(session.id, session.userId);
      return output({message: `Access Token: ${tokens.access} Refresh Token: ${tokens.refresh}`, });
    }

    return output({ message: 'User not found!', });
  }
}