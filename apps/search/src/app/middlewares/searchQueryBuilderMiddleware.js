import {LOCATION_URL_CHANGE, FULFILLED, FETCH_ELASTIC_SEARCH_DATA} from '../constants/ActionTypes';
import buildElasticSearchQuery from './elasticSearchQueryUtils';
import {matchPath} from 'react-router';
import {SSP_SEARCH_PAGE_URL, SSP_SEARCH_SPORT_LOCATION, PATH_VARIABLE_LOCATION, SSP_SEARCH_ONLY_LOCATION, PATH_VARIABLE_SPORT} from '../constants/RouterPaths';
import QueryString from 'query-string';
import {getTrimmedQueryParam} from '../utils/sspSearchUtils';
import {fetchNearByLocations} from '../actions';
import history from '../history/configureHistory';
import pathToRegExp from 'path-to-regexp';
import appConstants from '../constants/appConstants';
import sortElasticSearchData from './elasticSearchDataSortUtils';

const searchQueryBuilderMiddleware = store => next => action => {
  next(action);

  switch (action.type) {
    case LOCATION_URL_CHANGE: {
      const newRoute = action.data;
      const {search, pathname} = newRoute.location;
      const query = QueryString.parse(search);
      query.page -= 1;
      console.log('query search', query);
      const match = matchPath(pathname, {path: SSP_SEARCH_PAGE_URL, strict: false});
      if (match) {
        buildElasticSearchQuery(store, query, pathname);
      }
      break;
    }
    case FETCH_ELASTIC_SEARCH_DATA + FULFILLED: {
      sortElasticSearchData(store, action);
      break;
    }

    default: {
      break;
    }
  }
};

export default searchQueryBuilderMiddleware;
