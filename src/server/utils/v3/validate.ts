import { decodeTokenJwt, } from './token';

export async function validateSession(token: string) {
  /**
   * Determine the correctness of the data from the token.
   * @param {string} token - Token from user request.
   * @returns {Object<boolean, string, string>}.
   */
  const data = await decodeTokenJwt(token);
  if (data) {
    return { isValide: true, userId: data.userId, sessionId: data.sessionId, };
  }

  return { isValide: false, };
}

export async function checkParams(payload): Promise<boolean> {
  /**
   * Check if the request body contains a password and username.
   * @param {object} payload - Request parameters.
   * @returns {boolean} Are there parameters username and password in the request.
   */
  if (!payload.username || !payload.password) {
    return false;
  }

  return true;
}
