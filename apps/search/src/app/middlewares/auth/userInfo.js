import {FULFILLED, FETCH_USER_PROFILES} from '../../constants/ActionTypes';
import {fetchUserInfo} from '../../actions/index';
import {setupShortRegistrationFlow} from '../../utils/registration';
import config from '../../config';
import appConstants from '../../constants/appConstants';

function isAnyProfileActivated(profiles) {
  const profile = profiles.find(profile => profile.isActive === appConstants.profileActiveFlages.active);
  if (profile) {
    return true;
  }
  return false;
}

const userInfo = store => next => action => {
  next(action);
  switch (action.type) {
    case FETCH_USER_PROFILES + FULFILLED: {
      const {responseCode, payload} = action.payload.data;
      if (responseCode === 0) {
        if (payload.length < 1) {
          setupShortRegistrationFlow();
          window.open(config.dashboardUrl, '_self');
        } else {
          store.dispatch(fetchUserInfo());
        }
      }
      break;
    }
    default: {
      break;
    }
  }
};

export default userInfo;
