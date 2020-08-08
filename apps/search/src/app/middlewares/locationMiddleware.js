
import {UPDATE_BROWSER_GPS_PLUGIN_DATA, FULFILLED, FETCH_LOCATION_REVERSE_LOOKUP_DATA, FETCH_NEARBY_LOCATIONS} from '../constants/ActionTypes';
import {fetchNearByLocations} from '../actions';
import history from '../history/configureHistory';
import {getTrimmedQueryParam} from '../utils/sspSearchUtils';
import {matchPath} from 'react-router-dom';
import pathToRegExp from 'path-to-regexp';
import {SSP_SEARCH_SPORT_LOCATION, SSP_SEARCH_ONLY_LOCATION, PATH_VARIABLE_LOCATION, PATH_VARIABLE_SPORT} from '../constants/RouterPaths';

const getLongLatString = (longitude, latitude) => {
  return `${longitude},${latitude}`;
};

const locationMiddleware = store => next => action => {
  next(action);
  switch (action.type) {
    case UPDATE_BROWSER_GPS_PLUGIN_DATA: {
      const {coords} = action;
      const {latitude, longitude} = coords;
      const latlngString = getLongLatString(longitude, latitude);
      store.dispatch(fetchNearByLocations(latlngString));
      break;
    }
    case FETCH_LOCATION_REVERSE_LOOKUP_DATA + FULFILLED: {
      const data = action.payload.data.payload;
      const {latitude, longitude} = data;
      const latlngString = getLongLatString(longitude, latitude);
      store.dispatch(fetchNearByLocations(latlngString));
      break;
    }
    case FETCH_NEARBY_LOCATIONS + FULFILLED: {
      const storeState = store.getState();
      const searchData = storeState.searchData.data;
      const totalSearchHits = (searchData && searchData.hits.total) ? searchData.hits.total : 0;
      const data = action.payload.data.payload;
      const {city} = data;
      updateNearByCityForSearch(city, (totalSearchHits === 0));
      break;
    }
    default: {
      break;
    }
  }
};

function updateNearByCityForSearch(locName, noResult) {
  const {location} = history;
  const {pathname, search} = location;
  const locationName = getTrimmedQueryParam(locName);
  let changedPathname = null;
  const match = matchPath(pathname, {path: SSP_SEARCH_SPORT_LOCATION, strict: false, exact: true});
  let sportname = null;
  if (match) {
    sportname = match.params[PATH_VARIABLE_SPORT];
    const oldLocationName = match.params[PATH_VARIABLE_LOCATION];
    if (sportname && ((!oldLocationName) || (noResult === true && (oldLocationName !== locationName)))) {
      const sportLocationPath = pathToRegExp.compile(SSP_SEARCH_SPORT_LOCATION);
      changedPathname = sportLocationPath(
        {
          [PATH_VARIABLE_SPORT]: sportname,
          [PATH_VARIABLE_LOCATION]: locationName
        }
      );
    }
  } else {
    const matchOnlyLocation = matchPath(pathname, {path: SSP_SEARCH_ONLY_LOCATION, strict: false, exact: true});
    let oldLocationName = null;
    if (matchOnlyLocation) {
      oldLocationName = matchOnlyLocation.params[PATH_VARIABLE_LOCATION];
    }
    if ((!oldLocationName) || (noResult === true && (oldLocationName !== locationName))) {
      const sportLocationPath = pathToRegExp.compile(SSP_SEARCH_ONLY_LOCATION);
      changedPathname = sportLocationPath(
        {
          [PATH_VARIABLE_LOCATION]: locationName
        }
      );
    }
  }
  if (changedPathname) {
    history.push({
      pathname: changedPathname,
      search
    });
  }
}

export default locationMiddleware;
