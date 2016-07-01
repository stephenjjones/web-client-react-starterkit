/* @flow */

import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

//import DevTools from 'views/app/containers/DevTools';
import routes from 'js/routes';

export default class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div>
          <Router history={browserHistory} routes={routes} />
          {/*<DevTools />*/}
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};
