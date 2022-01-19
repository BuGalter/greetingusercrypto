import { greetingUser, userRegistration, userLogging, } from '../../api/v3/user';

export default [
  {
    method: 'POST',
    path: '/v3/user/reg',
    handler: userRegistration,
  },
  {
    method: 'POST',
    path: '/v3/user/login',
    handler: userLogging,
  },
  {
    method: 'GET',
    path: '/v3/user/{id}',
    handler: greetingUser,
  }
];
