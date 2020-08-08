import {applyMiddleware} from 'redux';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import setStoreMiddleware from './setStoreMiddleware';
import messagingMiddleWareFirst from './messagingMiddleware';
import createSagaMiddleware from 'redux-saga';
import messagePollingSaga from './messagePollingSaga';
import sspValidation from './sspValidation/index';
import profile from './Profile';
import contact from './contact.js';
import * as configuration from '../config/config.json';

import setCurrentSportData from './setCurrentSportData';
import parent from './parent';
import sessions from './sessions';
import saveDataOnNextMiddleware from './saveDataOnNextMiddleware';
import sports from './sports';
import athlete from './athlete';
import biography from './biography';
import changeProfile from './changeProfile';
import sspMiddlewares from './ssp';
export const sagaMiddleware = createSagaMiddleware();
import shoppingCart from './shoppingCart';
import payment from './payment';

const middlewares = [
  ...athlete,
  promiseMiddleware(),
  ...messagingMiddleWareFirst,
  profile,
  setStoreMiddleware,
  sagaMiddleware,
  contact,
  ...sspValidation,
  setCurrentSportData,
  sessions,
  biography,
  sports,
  ...parent,
  saveDataOnNextMiddleware,
  changeProfile,
  ...sspMiddlewares,
  ...shoppingCart,
  ...payment
];

if (configuration.canRemoveLogs === false) {
 // middlewares.push(logger);
}

export default applyMiddleware(
  ...middlewares
);

export function runSagaMiddleware() {
  sagaMiddleware.run(messagePollingSaga);
}

