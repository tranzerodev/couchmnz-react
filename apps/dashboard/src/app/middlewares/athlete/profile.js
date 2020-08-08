import {
  fetchAthleteProfile, fetchAthleteAccount, saveAthleteProfile, setAthletePicture, saveAthletePreferences, changeProfile, fetchAthletePreferences
} from '../../actions';
import {SAVE_ATHLETE_PROFILE, SAVE_ATHLETE_PREFERENCES, SAVE_ATHLETE_ACCOUNT, CREATE_NEW_ROLE, SAVE_ATHLETE_SHORT_PROFILE, ADD_ATHLETE_PICTURE, FETCH_ATHLETE_PROFILE} from '../../constants/ActionTypes';
import {FULFILLED} from '../../constants/ActionTypes';
import {notNull} from '../../validators/common/util';
import appConstants from '../../constants/appConstants';
import {removeShortRegFlow, searchFilter} from '../../utils/registration';
import config from '../../config';

const setStore = store => next => action => {
  next(action);
  switch (action.type) {
    case SAVE_ATHLETE_PROFILE + FULFILLED:
    case ADD_ATHLETE_PICTURE + FULFILLED:
    {
      const {profile} = store.getState();
      if (action.payload.data.responseCode === 0) {
        store.dispatch(fetchAthleteProfile({athleteId: profile.data.id}));
      }
      break;
    }
    case CREATE_NEW_ROLE + FULFILLED: {
      if (action.payload.data.responseCode === 0) {
        const {newProfile} = action.payload.data.payload;
        if (newProfile && newProfile.type === appConstants.userProfileTypes.ATHLETE) {
          store.dispatch(changeProfile(newProfile));
        }
      }
      break;
    }
    case SAVE_ATHLETE_PREFERENCES + FULFILLED: {
      const {profile} = store.getState();
      if (action.payload.data.responseCode === 0) {
        const sportId = JSON.parse(action.payload.config.data).id;
        store.dispatch(fetchAthletePreferences({athleteId: profile.data.id, sportId}));
      }
      break;
    }
    case SAVE_ATHLETE_ACCOUNT + FULFILLED: {
      if (action.payload.data.responseCode === 0) {
        store.dispatch(fetchAthleteAccount());
      }
      break;
    }
    case FETCH_ATHLETE_PROFILE + FULFILLED: {
      if (action.payload.data.responseCode === 0) {
        const {profileImage} = action.payload.data.payload;
        if (notNull(profileImage)) {
          store.dispatch(setAthletePicture(profileImage));
        }
      }
      break;
    }
    case SAVE_ATHLETE_SHORT_PROFILE + FULFILLED: {
      if (action.payload.data.responseCode === 0) {
        let url = searchFilter(action.payload.config.data);
        url = url ? url : config.searchUrl;
        removeShortRegFlow();
        window.location.href = url;
      }
      break;
    }
    default: break;
  }
};

export default setStore;
