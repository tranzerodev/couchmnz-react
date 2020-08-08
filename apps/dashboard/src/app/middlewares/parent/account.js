import {LOCATION_URL_CHANGE, FULFILLED} from '../../constants/ActionTypes';
import {matchPath} from 'react-router';
import {DASHBOARD_PARENT_ACCOUNT_ORDER_HISTORY} from '../../constants/pathConstants';
import {handleAccountUrlChange} from './accountUtils';
const athleteAccountScheduler = store => next => action => {
  next(action);

  switch (action.type) {
    case LOCATION_URL_CHANGE: {
      const {location} = action.data;
      const {pathname} = location;
      const match = matchPath(pathname, {path: DASHBOARD_PARENT_ACCOUNT_ORDER_HISTORY, strict: false, exact: false});
      const storeState = store.getState();
      const {userProfiles} = storeState;
      if (match && userProfiles.status === FULFILLED) {
        const profileID = userProfiles.selectedProfile.id;
        handleAccountUrlChange(store, profileID, location);
      }
      break;
    }
    default: {
      break;
    }
  }
};

export default athleteAccountScheduler;
