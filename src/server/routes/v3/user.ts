import { greetingUser, } from '../../api/v3/user';

export default [
  {
    method: 'GET',
    path: '/v3/user/{id}',
    handler: greetingUser,
  }
];
