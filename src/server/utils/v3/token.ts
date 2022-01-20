import * as jwt from 'jsonwebtoken';
import { configSafety, } from '../../config/v3/config';

export async function createTokensJWT(sessionId: string, userId: string) {
  const access = jwt.sign({ sessionId, userId, }, configSafety.tokenKeyAccess,
    { expiresIn: configSafety.lifeTimeAccessToken, });

  const refresh = jwt.sign({ sessionId, userId, }, configSafety.tokenKeyRefresh,
    { expiresIn: configSafety.lifeTimeRefreshToken, });

  return { access, refresh, };
}

export async function decodeTokenJwt(token: string) {
  try {
    return jwt.verify(token, configSafety.tokenKeyAccess);
  }
  catch (e) {
    console.log(e);
  }
}
