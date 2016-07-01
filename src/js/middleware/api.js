/* @flow weak */

// adapted from: https://github.com/rackt/redux/blob/master/examples/real-world/middleware/api.js

import 'whatwg-fetch';
import { camelizeKeys } from 'humps';
import { Schema, arrayOf, normalize } from 'normalizr';
import { browserHistory } from 'react-router';


// Extracts the next page URL from API response
function getNextPageUrl(json) {
  const nextLink = json.next;
  if (!nextLink) {
    return null;
  }
  return nextLink;
}

// TODO: needs to be dynamic based on environment
const API_ROOT = 'http://localhost:5000/api';

function callApi(endpoint, apiOptions, schema) {
  console.log('endpoing ' + endpoint);
  const fullUrl = (endpoint.indexOf('http') === 0) ? endpoint : API_ROOT + endpoint;
  console.log('fullUrl ' + fullUrl);

  return fetch(fullUrl, apiOptions)
    .then(response => { 
      if (response.status == '204') {
        return {response};
      }
      return response.json().then(json => ({ json, response }));
    }).then(({ json, response }) => {
      if (response.status == '204') { return {};}// if delete success return empty result
      if (!response.ok) {
        return Promise.reject(json);
      }

      let data;
      if (json.results) {
        data = json.results;
      } else {
        data = json;
      }
      const camelizedJson = camelizeKeys(data);
      // this is not needed since next url alread a json attr
      const nextPageUrl = getNextPageUrl(json);

      const result = Object.assign({},
        normalize(camelizedJson, schema),
        {entityId: data.id},
        { nextPageUrl }
      );
      return result;
    });
}

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where resouce types are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/gaearon/normalizr

const userSchema = new Schema('users');

export const Schemas = {
  USER: userSchema
};

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API';

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API];

  // only run this middleware if CALL_API is defined on the action
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { schema, types, transitionToUrlOnSuccess } = callAPI;
  let { payload } = callAPI;

  // optionally can provide a function as the endpoint attr
  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  if (!schema) {
    throw new Error('Specify one of the exported Schemas.');
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  // Flow doesn't support default values for destructuring assignments so done in separate step
  // also changed const to let in action destructuring above
  // https://github.com/facebook/flow/issues/183
  if (payload === undefined) payload = {};

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [ requestType, successType, failureType ] = types;
  next(actionWith({ type: requestType, entityType: callAPI.entityType, payload: payload }));

  return callApi(endpoint, callAPI.apiOptions, schema, transitionToUrlOnSuccess).then(
    response => {
      next(actionWith({
        response,
        type: successType,
        entityType: callAPI.entityType,
        payload: payload
      }));

      if (transitionToUrlOnSuccess) {
        const nextUrl = transitionToUrlOnSuccess(response);
        browserHistory.push(nextUrl);
        //next(browserHistory.push(nextUrl));
      }
    },
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  );
};
