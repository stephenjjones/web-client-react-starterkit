/* @flow weak */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import api from 'js/middleware/api';
import rootReducer from 'js/reducers';

import DevTools from 'js/views/app/DevTools';

// For logger to work with Immutablejs
import {Iterable} from 'immutable';
const stateTransformer = (state) => {
  if (Iterable.isIterable(state)) return state.toJS();
  else return state;
};


const finalCreateStore = compose(
  applyMiddleware(thunk, api, createLogger({stateTransformer})),
  DevTools.instrument()
)(createStore);


// Optionally Change: https://github.com/rackt/redux/releases/tag/v3.1.0
export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  return store;
}
