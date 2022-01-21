import { output, error, } from '../../utils';
import { createTokensJWT, } from '../../utils/v3/token';
import { checkParams, validateSession, } from '../../utils/v3/validate';
import { addDbUser, addDbSession, findDbUser, findDbUseById, } from '../../utils/v3/db';

export async function greetingUser(r) {
  const token = r.headers.authorization;
  if (!token) {
    return error(403000, 'Access denied!', null);
  }

  const valide = await validateSession(token);
  if (valide.isValide) {
    const userName = await findDbUseById(valide.userId);
    return output({ message: `Hi, ${ userName }!`, });
  }

  return error(403000, 'Access denied!', null);
}

export async function userRegistration(r) {
  const paramsCorrect = await checkParams(r.payload);
  if (!paramsCorrect) {
    return error(403000, 'Wrong password or login!', null);
  }

  const userId = await findDbUser(r.payload.username, r.payload.password);
  if (!userId) {
    const user = await addDbUser(r.payload.username, r.payload.password);
    if (!user) {
      return error(500000, 'Server error!', null);
    }

    return output({ message: `User: ${ r.payload.username }, added!`, });
  }

  return output({ message: `Hi, ${ r.payload.username }!`, });
}

export async function userAuth(r) {
  const paramsCorrect = await checkParams(r.payload);
  if (!paramsCorrect) {
    return error(403000, 'Wrong password or login!', null);
  }

  const userId = await findDbUser(r.payload.username, r.payload.password);
  if (!userId) {
    return error(404000, 'User not found!', null);
  }

  const sessionId = await addDbSession(userId);
  if (!sessionId) {
    return error(500000, 'Server error!', null);
  }

  const tokens = await createTokensJWT(sessionId, userId);
  return output({ message: `Access Token: ${tokens.access} Refresh Token: ${tokens.refresh}`, });
}
