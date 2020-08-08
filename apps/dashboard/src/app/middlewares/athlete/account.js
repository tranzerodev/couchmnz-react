import {LOCATION_URL_CHANGE, FULFILLED, FETCH_ATHLETE_ACCOUNT} from '../../constants/ActionTypes';
import {matchPath} from 'react-router';
import {DASHBOARD_ATHLETE_ACCOUNT_ORDER_HISTORY} from '../../constants/pathConstants';
import {handleAccountUrlChange} from './accountUtils';
import moment from 'moment-timezone';
const athleteAccountScheduler = store => next => action => {
  next(action);
  const storeState = store.getState();
  const {userProfiles} = storeState;
  switch (action.type) {
    case LOCATION_URL_CHANGE: {
      const {location} = action.data;
      const {pathname} = location;
      const match = matchPath(pathname, {path: DASHBOARD_ATHLETE_ACCOUNT_ORDER_HISTORY, strict: false, exact: false});
      if (userProfiles.status === FULFILLED && match) {
        const profileID = userProfiles.selectedProfile.id;
        handleAccountUrlChange(store, profileID, location);
      }
      break;
    }
    case FETCH_ATHLETE_ACCOUNT + FULFILLED: {
      if (action.payload.data.payload.timezone && action.payload.data.payload.timezone.name) {
        const timeZoneLabel = action.payload.data.payload.timezone.name;
        const timeZoneString = timeZoneLabel.split(' (')[0]; // TODO Need to fix this
        if (timeZoneString) {
          moment.tz.setDefault(timeZoneString);
        }
      }
      break;
    }
    default: {
      break;
    }
  }
};

export default athleteAccountScheduler;
