import { greetingUser, userRegistration, } from '../../api/v3/user';

export default [
  {
    method: 'POST',
    path: '/v3/user/reg',
    handler: userRegistration,
  },
  {
    method: 'GET',
    path: '/v3/user/{id}',
    handler: greetingUser,
  }
];
