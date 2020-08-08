import {applyMiddleware} from 'redux';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import fetchSuggestionsMiddleware from './fetchSuggestionsMiddleware';
import searchQueryBuilderMiddleware from './searchQueryBuilderMiddleware';
import searchDetailsLocationChange from './searchDetailsLocationChange';
import locationMiddleware from './locationMiddleware';
import auth from './auth';
import shoppingCart from './shoppingCart';
import * as configuration from '../config/config.json';

const middlewares = [
  promiseMiddleware(),
  fetchSuggestionsMiddleware,
  searchQueryBuilderMiddleware,
  searchDetailsLocationChange,
  locationMiddleware,
  ...auth,
  ...shoppingCart
];

if (configuration.canRemoveLogs === false) {
  middlewares.push(logger);
}

export default applyMiddleware(
  ...middlewares
);
