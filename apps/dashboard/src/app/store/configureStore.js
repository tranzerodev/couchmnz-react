import {createStore} from 'redux';
import rootReducer from '../reducers/index';
import {setLanguage} from 'redux-polyglot';

import config from '../config';
import middlewares, {runSagaMiddleware} from '../middlewares';

import { composeWithDevTools } from 'redux-devtools-extension'
import * as configuration from '../config/config.json';

const middleWares = () => {
  if (configuration.canRemoveLogs === false) {
    return composeWithDevTools(middlewares)
  }
  return middlewares
}

export default function configureStore(locale) {
  const store = createStore(rootReducer, {}, middleWares());
  store.dispatch(setLanguage(locale, config.translations[locale]));
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = rootReducer;
      store.replaceReducer(nextReducer);
    });
  }
  runSagaMiddleware();
  return store;
}
