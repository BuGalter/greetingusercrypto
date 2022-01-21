import { decodeTokenJwt, } from './token';

export async function validateSession(token: string) {
  /**
   * Return userId if available or not false.
   * @param {string} token - Token from user request.
   * @returns {Object<boolean, string>}.
   */
  const data = await decodeTokenJwt(token);
  if (data) {
    return { isValide: true, userId: data.userId, sessionId: data.sessionId, };
  }

  return { isValide: false, };
}

export async function checkParams(payload): Promise<boolean> {
  /**
   * @param {object} payload - Request parameters.
   * @returns {boolean} Are there parameters username and password in the request.
   */
  if (!payload.username || !payload.password) {
    return false;
  }

  return true;
}
