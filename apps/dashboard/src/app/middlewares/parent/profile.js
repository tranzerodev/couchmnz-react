import {
  fetchParentProfile, fetchParentAccount, fetchParentPreferences, setChildPicture, saveParentProfile, saveParentPreferences, changeProfile, clearParentPreferences
} from '../../actions';
import {SAVE_PARENT_PROFILE, SAVE_PARENT_PREFERENCES, SAVE_PARENT_ACCOUNT, CREATE_NEW_ROLE, ADD_CHILD_PICTURE, FETCH_PARENT_PROFILE, SAVE_PARENT_SHORT_PROFILE} from '../../constants/ActionTypes';
import {FULFILLED} from '../../constants/ActionTypes';
import {notNull, isNonEmptyArray} from '../../validators/common/util';
import appConstants from '../../constants/appConstants';
import {removeShortRegFlow, searchFilter} from '../../utils/registration';
import config from '../../config';

const setStore = store => next => action => {
  next(action);
  switch (action.type) {
    case SAVE_PARENT_PROFILE + FULFILLED:
    case ADD_CHILD_PICTURE + FULFILLED:
    {
      const {parent} = store.getState();
      const {profile} = parent;
      if (action.payload.data.responseCode === 0) {
        store.dispatch(fetchParentProfile({parentId: profile.data.parentId, childId: profile.data.id}));
      }
      break;
    }

    case CREATE_NEW_ROLE + FULFILLED: {
      if (action.payload.data.responseCode === 0) {
        const {newProfile} = action.payload.data.payload;
        if (newProfile && newProfile.type === appConstants.userProfileTypes.PARENT) {
          store.dispatch(changeProfile(newProfile));
        }
      }
      break;
    }

    case SAVE_PARENT_PREFERENCES + FULFILLED: {
      const {parent} = store.getState();
      const {profile} = parent;
      if (action.payload.data.responseCode === 0) {
        const sportId = JSON.parse(action.payload.config.data).id;
        store.dispatch(fetchParentPreferences({parentId: profile.data.parentId, childId: profile.data.id, sportId}));
      }
      break;
    }
    case SAVE_PARENT_ACCOUNT + FULFILLED: {
      if (action.payload.data.responseCode === 0) {
        store.dispatch(fetchParentAccount());
      }
      break;
    }
    case SAVE_PARENT_SHORT_PROFILE + FULFILLED: {
      if (action.payload.data.responseCode === 0) {
        let url = searchFilter(action.payload.config.data);
        url = url ? url : config.searchUrl;
        removeShortRegFlow();
        window.location.href = url;
      }
      break;
    }
    case FETCH_PARENT_PROFILE + FULFILLED: {
      if (action.payload.data.responseCode === 0) {
        const {profileImage, sports} = action.payload.data.payload;
        if (notNull(profileImage)) {
          store.dispatch(setChildPicture(profileImage));
        }
        if (!isNonEmptyArray(sports)) {
          store.dispatch(clearParentPreferences());
        }
      }
      break;
    }
    default: break;
  }
};

export default setStore;
