import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from './app/store/configureStore';
import {configureHistory} from './app/history/configureHistory';
import Main from './app/containers/Main/';
import {setAxiosRequestIntercepter, setResponseInterceptor} from './auth/auth';

import * as configuration from './app/config/config.json';

if (configuration.canRemoveLogs === true) {
  console.log = function () {};
}

setAxiosRequestIntercepter();

const store = configureStore('enUs');
const history = configureHistory(store);

setResponseInterceptor(store);

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" name="Home" component={Main}/>
      </Switch>
    </Router>
  </Provider>
), document.getElementById('root'));
