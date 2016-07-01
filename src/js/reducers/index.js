import { combineReducers } from 'redux-immutablejs';
import { reducer as formReducer } from 'redux-form';
import Immutable from 'immutable';

import auth from './auth';

//http://erikras.github.io/redux-form/#/faq/how-to-clear?_k=luqku7
//http://erikras.github.io/redux-form/#/faq/immutable-js?_k=13hfe7
const form = (state = Immutable.fromJS({}), action) => Immutable.fromJS(formReducer.normalize({

}).plugin({
  login: (state, action) => {
    switch(action.type) {
    default:
      return state;
    }
  }
})(state.toJS(), action));

const rootReducer = combineReducers({
  auth,
  form: form
});

export default rootReducer;
