import {FULFILLED, PENDING, REJECTED, FETCH_USER_PROFILES, CLEAR_USER_PROFILES, CHANGE_PROFILE, CREATE_NEW_PROFILE, ACTIVATE_NEW_PROFILE} from '../constants/ActionTypes';
import appConstants from '../constants/appConstants';
import {isNonEmptyArray} from '../validators/common/util';
const initialState = {data: [], status: null, selectedProfile: null};
const userProfiles = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_PROFILES + PENDING: {
      return Object.assign({}, state, {status: PENDING});
    }
    case FETCH_USER_PROFILES + FULFILLED: {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      return Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED});
    }
    case FETCH_USER_PROFILES + REJECTED: {
      return Object.assign({}, state, {status: REJECTED});
    }
    case CLEAR_USER_PROFILES: {
      return initialState;
    }
    case CHANGE_PROFILE: {
      const {profile} = action;
      if (profile && profile.type === appConstants.userProfileTypes.PARENT) {
        if (profile.dependentId) {
          const selectedProfile = isNonEmptyArray(profile.dependents) ? {...profile, dependents: [profile.dependents.find(p => p.id === profile.dependentId)]} : null;
          if (selectedProfile) {
            return Object.assign({}, state, {selectedProfile});
          }
        }
        return state;
      }
      return Object.assign({}, state, {selectedProfile: profile});
    }
    case CREATE_NEW_PROFILE + FULFILLED: {
      if (action.payload.data.responseCode === 0) {
        const {profiles, newProfile} = action.payload.data.payload;
        if (newProfile.type === appConstants.userProfileTypes.PARENT) {
          return Object.assign({}, state, {
            data: profiles,
            selectedProfile: {...newProfile, dependentId: newProfile.dependents[0].id},
            status: FULFILLED
          });
        }
        return Object.assign({}, state, {
          data: profiles,
          selectedProfile: newProfile,
          status: FULFILLED
        });
      }
      return state;
    }
    case ACTIVATE_NEW_PROFILE + FULFILLED: {
      if (action.payload.data.responseCode === 0 && action.payload.data.payload) {
        const {profiles, newProfile} = action.payload.data.payload;
        if (newProfile.type === appConstants.userProfileTypes.ISP) {
          return Object.assign({}, state, {
            data: profiles,
            selectedProfile: newProfile,
            status: FULFILLED
          });
        }
      }
      return state;
    }
    default:
      return state;
  }
};

export default userProfiles;
