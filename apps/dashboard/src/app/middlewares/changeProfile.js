import {CHANGE_PROFILE, LOCATION_URL_CHANGE, CREATE_NEW_PROFILE, FULFILLED} from '../constants/ActionTypes';
import handleChangeProfile, {handleUrlChange} from './utils/changeProfileUtils';
import {matchPath} from 'react-router';
import {DASHBOARD_PROFILE_TYPE, REGISTRATION_PROFILE_TYPE} from '../constants/pathConstants';
import appConstants from '../constants/appConstants';
import {fetchMessagesMetadata} from '../actions';
import {canFetchMetadata} from '../validators/common/messages';
const setStore = store => next => action => {
  next(action);
  switch (action.type) {
    case CHANGE_PROFILE: {
      handleChangeProfile(action.profile, store);
      if (canFetchMetadata(action.profile)) {
        store.dispatch(fetchMessagesMetadata(action.profile.id));
      }
      break;
    }
    case LOCATION_URL_CHANGE: {
      const {location} = action.data;
      const {pathname, state} = location;
      const match = matchPath(pathname, {path: DASHBOARD_PROFILE_TYPE, strict: false, exact: false});
      const matchRegistration = matchPath(pathname, {path: REGISTRATION_PROFILE_TYPE, strict: false, exact: false});
      if (match) {
        if (match.params && match.params.profileType && match.params.profileType === appConstants.userProfileTypes.PARENT) {
          if (state && state.dependentId) {
            handleUrlChange(store, location, match);
          }
        } else {
          handleUrlChange(store, location, match);
        }
      } else if (matchRegistration) {
        if (matchRegistration.params && matchRegistration.params.profileType && matchRegistration.params.profileType === appConstants.userProfileTypes.PARENT) {
          if (state && state.dependentId) {
            handleUrlChange(store, location, matchRegistration);
          }
        } else {
          handleUrlChange(store, location, matchRegistration);
        }
      }
      break;
    }
    case CREATE_NEW_PROFILE + FULFILLED: {
      if (action.payload.data.responseCode === 0) {
        handleChangeProfile(action.payload.data.payload.newProfile, store);
      }
      break;
    }
    default:break;
  }
};

export default setStore;
