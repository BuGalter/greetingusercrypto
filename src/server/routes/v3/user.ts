import { greetingUser, userRegistration, userAuth, } from '../../api/v3/user';

export default [
  {
    method: 'POST',
    path: '/v3/user/reg',
    handler: userRegistration,
  },
  {
    method: 'POST',
    path: '/v3/user/auth',
    handler: userAuth,
  },
  {
    method: 'GET',
    path: '/v3/user',
    handler: greetingUser,
  }
];
