import { CALL_API, Schemas } from 'js/middleware/api';

import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS } from './actionTypes';
import { REGISTER_REQUEST, REGISTER_FAILURE, REGISTER_SUCCESS } from './actionTypes';

// ============= AUTH ACTIONS ====================

export function login(email, password) {

  return {
    [CALL_API]: {
      types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
      endpoint: `http://localhost:5000/api/token`,
      entityType: 'users',
      schema: Schemas.USER,
      transitionToUrlOnSuccess: (response) => `/`,
      apiOptions: {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Basic ${new Buffer(email + ':' + password).toString('base64')}`
        },
        //credentials: 'include', // do not sending cookies
        mode: 'cors',
        body: JSON.stringify({ email: email, password: password })
      },
      payload: { email: email, password: password }
    }
  };
}

export function register(email, password) {
  return {
    [CALL_API]: {
      types: [REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE],
      endpoint: `/users`,
      entityType: 'users',
      schema: Schemas.USER,
      transitionToUrlOnSuccess: (response) => `/`,
      apiOptions: {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        //credentials: 'include', // do not sending cookies
        mode: 'cors',
        body: JSON.stringify({ email: email, password: password })
      },
      payload: { email: email, password: password }
    }
  };
}

