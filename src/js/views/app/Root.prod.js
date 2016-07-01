/* @flow */

import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import routes from 'js/routes';

const Root = ({ store }) => (
      <Provider store={store}>
          <Router history={browserHistory} routes={routes} />
            </Provider>
    );

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;
