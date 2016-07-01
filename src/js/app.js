import React from 'react';
import { render } from 'react-dom';

import Root from 'js/views/app/Root';
import configureStore from 'js/store/configureStore';

const store = configureStore();

render((
  <Root store={store}/>
), document.getElementById('app'));
