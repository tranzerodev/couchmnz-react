import {matchPath} from 'react-router';

import {LOCATION_URL_CHANGE, FULFILLED} from '../../constants/ActionTypes';
import {DASHBOARD_ATHLETE_SCHEDULE} from '../../constants/pathConstants';
import {handleSchedulerUrlChange} from './schedulerUtils';
import appConstants from '../../constants/appConstants';

const athleteScheduler = store => next => action => {
  next(action);
  const storeState = store.getState();
  const {userProfiles} = storeState;
  if (userProfiles.status === FULFILLED) {
    switch (action.type) {
      case LOCATION_URL_CHANGE: {
        const {location} = action.data;
        const {pathname} = location;
        const match = matchPath(pathname, {path: DASHBOARD_ATHLETE_SCHEDULE, strict: false, exact: false});
        if (match) {
          const {selectedProfile} = userProfiles;
          let profileID;
          if (selectedProfile.type === appConstants.userProfileTypes.ATHLETE) {
            profileID = selectedProfile.id;
          } else if (selectedProfile.type === appConstants.userProfileTypes.PARENT) {
            profileID = selectedProfile.dependentId;
          } else {
            return;
          }
          handleSchedulerUrlChange(store, profileID, location, selectedProfile.type);
        }
        break;
      }
      default: {
        break;
      }
    }
  }
};

export default athleteScheduler;
