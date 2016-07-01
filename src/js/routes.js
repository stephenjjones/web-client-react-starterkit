import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppContainer from 'js/views/app/AppContainer';
import HomeContainer from 'js/views/home/HomeContainer';
import LoginContainer from 'js/views/login/LoginContainer';
import NoMatch from 'js/components/NoMatch';

export default (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={HomeContainer}/>
    <Route path="login" component={LoginContainer}/>
    <Route path="*" component={NoMatch}/>
  </Route>
);
