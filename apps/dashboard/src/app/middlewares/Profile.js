import {
  setDisplayPicture,
  setActionPictures,
  setActionVideos,
  setSports,
  fetchCurrentSport,

  fetchSessions,
  fetchEvents,
  fetchUserProfiles,
  fetchProfile
} from '../actions';
import {FULFILLED, ADD_PICTURE, DELETE_ACTION_PICTURE, DELETE_ACTION_VIDEO, DELETE_SPORT, UPLOAD_ACTION_PICTURES, UPLOAD_ACTION_VIDEOS, POST_SESSIONS, DELETE_SESSION, POST_EVENTS, DELETE_EVENT, DELETE_DISCOUNT, ACTIVATE_NEW_PROFILE} from '../constants/ActionTypes';
import appConstants from '../constants/appConstants';
/* eslint complexity: 0 */
const setStore = store => next => action => {
  next(action);
  switch (action.type) {
    case POST_SESSIONS + FULFILLED: {
      // Const {userIDs, sport} = store.getState();
      const {userProfiles, currentSport} = store.getState();
      if (action.payload.data.responseCode === 0) {
        store.dispatch(fetchSessions({profileID: userProfiles.selectedProfile.id, sportID: currentSport.data.id}));
        // Store.dispatch(fetchSessions({profileID: userIDs.data.coachIDs[0], sportID: sport.id}));
      }
      break;
    }

    case ADD_PICTURE + FULFILLED: {
      if (action.payload.data.responseCode === 0) {
        store.dispatch(setDisplayPicture(action.payload.data.payload.profile.displayPicture));
      }
      break;
    }
    case UPLOAD_ACTION_VIDEOS + FULFILLED: {
      if (action.payload.data.responseCode === 0) {
        store.dispatch(setActionVideos({videos: action.payload.data.payload.media.videos, baseUrl: action.payload.data.payload.media.vidBaseUrl}));
      }
      break;
    }
    case DELETE_ACTION_PICTURE + FULFILLED: {
      if (action.payload.data.responseCode === 0) {
        store.dispatch(setActionPictures({images: action.payload.data.payload.media.images, baseUrl: action.payload.data.payload.media.imgBaseUrl}));
      }
      break;
    }
    case DELETE_ACTION_VIDEO + FULFILLED: {
      if (action.payload.data.responseCode === 0) {
        store.dispatch(setActionVideos({videos: action.payload.data.payload.media.videos, baseUrl: action.payload.data.payload.media.vidBaseUrl}));
      }
      break;
    }
    case DELETE_SPORT + FULFILLED: {
      if (action.payload.data.responseCode === 0) {
        store.dispatch(setSports(action.payload.data.payload.summary.sports));
      }
      break;
    }
    case DELETE_SESSION + FULFILLED: {
      // Const {userIDs, sport} = store.getState();
      const {userProfiles, currentSport} = store.getState();
      if (action.payload.data.responseCode === 0) {
        store.dispatch(fetchSessions({profileID: userProfiles.selectedProfile.id, sportID: currentSport.data.id}));
        // Store.dispatch(fetchSessions({profileID: userIDs.data.coachIDs[0], sportID: sport.id}));
      }
      break;
    }
    case DELETE_EVENT + FULFILLED: {
      if (action.payload.data.responseCode === 0) {
        store.dispatch(fetchEvents());
      }
      break;
    }
    case DELETE_DISCOUNT + FULFILLED: {
      // Const {userIDs, sport} = store.getState();
      const {userProfiles, currentSport} = store.getState();
      if (action.payload.data.responseCode === 0) {
        store.dispatch(fetchCurrentSport({profileID: userProfiles.selectedProfile.id, sportID: currentSport.data.id}));
        // Store.dispatch(fetchCurrentSport({profileID: userIDs.data.coachIDs[0], sportID: sport.id}));
      }
      break;
    }
    case UPLOAD_ACTION_PICTURES + FULFILLED: {
      const {userProfiles, currentSport} = store.getState();
      if (action.payload.data.responseCode === 0) {
        store.dispatch(fetchCurrentSport({profileID: userProfiles.selectedProfile.id, sportID: currentSport.data.id}));
      }
      break;
    }
    case POST_EVENTS + FULFILLED: {
      if (action.payload.data.responseCode === 0) {
        store.dispatch(fetchEvents());
      }
      break;
    }
    case ACTIVATE_NEW_PROFILE + FULFILLED: {
      const {userProfiles} = store.getState();
      if (userProfiles.selectedProfile && userProfiles.selectedProfile.type === appConstants.userProfileTypes.ISP) {
        if (action.payload.data.responseCode === 0) {
          store.dispatch(fetchProfile({profileID: userProfiles.selectedProfile.id}));
          // Store.dispatch(fetchUserProfiles());
        }
      }
      break;
    }
    default:break;
  }
};

export default setStore;
