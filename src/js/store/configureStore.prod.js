/* @flow weak */
import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';

import api from 'js/middleware/api';
import rootReducer from 'js/reducers';

const finalCreateStore = compose(
  applyMiddleware(thunk, api)
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
}
