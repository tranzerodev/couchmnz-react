import {LOCATION_URL_CHANGE} from '../constants/ActionTypes';
import {matchPath} from 'react-router';
import {SSP_SEARCH_DETAILS} from '../constants/RouterPaths';
import {fetchSSPProfile, fetchSSPSessions} from '../actions/index';

const detailsPageLocationChange = store => next => action => {
  next(action);

  switch (action.type) {
    case LOCATION_URL_CHANGE: {
      const newRoute = action.data;
      const {pathname} = newRoute.location;
      const match = matchPath(pathname, {path: SSP_SEARCH_DETAILS, strict: false});
      if (match) {
        store.dispatch(fetchSSPProfile(match.params.nickname, match.params.sportID));
        store.dispatch(fetchSSPSessions(match.params.nickname, match.params.sportID, ''));
      }
      break;
    }
    default: {
      break;
    }
  }
};

export default detailsPageLocationChange;
