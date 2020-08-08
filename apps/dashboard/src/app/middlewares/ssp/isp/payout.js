import {LOCATION_URL_CHANGE} from '../../../constants/ActionTypes';
import {matchPath} from 'react-router';
import {handleAccountUrlChange} from './accountUtils';
import {DASHBOARD_ACCOUNT_PAYOUT_HISTORY} from '../../../constants/pathConstants';
const accountPayout = store => next => action => {
  next(action);

  switch (action.type) {
    case LOCATION_URL_CHANGE: {
      const storeState = store.getState();
      const {selectedProfile} = storeState.userProfiles;
      if (selectedProfile) {
        const {location} = action.data;
        const {pathname} = location;
        const match = matchPath(pathname, {path: DASHBOARD_ACCOUNT_PAYOUT_HISTORY, strict: false, exact: false});
        if (match) {
          const profileID = selectedProfile.id;
          handleAccountUrlChange(store, profileID, location);
        }
        break;
      }
      break;
    }
    default:break;
  }
};

export default accountPayout;
