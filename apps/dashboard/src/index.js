// Render react app
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from './app/store/configureStore';
import {configureHistory} from './app/history/configureHistory';

import {auth,logout} from './auth/auth';
import Main from './app/containers/Main/';
import * as configuration from './app/config/config.json';

if (configuration.canRemoveLogs === true) {
  console.log = function () {};
}

auth().then(authenticated => {
  if (authenticated === true) {
    const store = configureStore('enUs');
    const history = configureHistory(store);
    ReactDOM.render((
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="/" name="Home" component={Main}/>
            {/* <Route path="/logout" name="Logout" component={logout()} /> */}
          </Switch>
        </Router>
      </Provider>
    ), document.getElementById('root'));
  }
}).catch(error => {
  console.error(error);
});

