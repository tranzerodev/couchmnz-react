import {postProfile, changeSaveDataOnNextStaus, postCurrentSport, fetchProfile, fetchCurrentSport} from '../actions';
import {FULFILLED, PENDING, REJECTED, POST_PROFILE, POST_CURRENT_SPORT, FETCH_CURRENT_SPORT, FETCH_PROFILE} from '../constants/ActionTypes';

import appConstants from '../constants/appConstants';
const {saveType} = appConstants;
function actionPostProfile(response, status) {
  return {
    type: POST_PROFILE + status,
    payload: response
  };
}

function actionPostCurrentSport(response, status) {
  return {
    type: POST_CURRENT_SPORT + status,
    payload: response
  };
}

function actionFetchCurrentSport(response, status) {
  return {
    type: FETCH_CURRENT_SPORT + status,
    payload: response
  };
}

function actionFetchProfile(response, status) {
  return {
    type: FETCH_PROFILE + status,
    payload: response
  };
}

function fetchProfileSync(store, successCallback, errorCallback) {
  const storeState = store.getState();
  // Const profileID = storeState.userIDs.data.coachIDs[0];
  const profileID = storeState.userProfiles.selectedProfile.id;
  fetchProfile({profileID}).payload.then(response => {
    const {responseCode} = response.data;
    if (responseCode > 0) {
      store.dispatch(actionFetchProfile(response, REJECTED));
      errorCallback(response);
    } else {
      store.dispatch(actionFetchProfile(response, FULFILLED));
      successCallback();
    }
  }).catch(error => {
    store.dispatch(actionFetchProfile(error, REJECTED));
    errorCallback(error);
  });
}

function saveProfile(profile, store, successCallback, errorCallback) {
  postProfile(profile, {profileID: profile.profile.id}).payload.then(response => {
    console.log('post profile response', response);
    const {responseCode} = response.data;
    if (responseCode > 0) {
      store.dispatch(actionPostProfile(response, REJECTED));
      errorCallback(response);
    } else {
      fetchProfileSync(store, successCallback, errorCallback);
    }
  }).catch(reason => {
    store.dispatch(actionPostProfile(reason, REJECTED));
    errorCallback(reason);
  });
}

function fetchCurrentSportSync({profile, sport}, store, successCallback, errorCallback) {
  fetchCurrentSport({profileID: profile.profile.id, sportID: sport.id}).payload.then(response => {
    const {responseCode} = response.data;
    if (responseCode > 0) {
      store.dispatch(actionFetchCurrentSport(response, REJECTED));
      errorCallback(response);
    } else {
      store.dispatch(actionFetchCurrentSport(response, FULFILLED));
      successCallback();
    }
  }).catch(error => {
    store.dispatch(actionFetchCurrentSport(error, REJECTED));
    errorCallback(error);
  });
}

function saveCurrentSport({profile, sport}, store, successCallback, errorCallback) {
  postCurrentSport(sport, {profileID: profile.profile.id, sportID: sport.id}).payload.then(response => {
    console.log('post current response', response);
    const {responseCode} = response.data;
    if (responseCode > 0) {
      store.dispatch(actionPostCurrentSport(response, REJECTED));
      errorCallback(response);
    } else {
      fetchCurrentSportSync({profile, sport}, store, successCallback, errorCallback);
    }
  }).catch(reason => {
    store.dispatch(actionPostCurrentSport(reason, REJECTED));
    errorCallback(reason);
  });
}

export function saveData(updateType, {profile, sport}, store) {
  store.dispatch(changeSaveDataOnNextStaus(updateType, PENDING));
  if (updateType === saveType.onlyProfile) {
    saveProfile(profile, store, () => {
      store.dispatch(changeSaveDataOnNextStaus(updateType, FULFILLED));
    }, error => {
      console.log('Reson for http error in SaveOnlyProfile', error);
      store.dispatch(changeSaveDataOnNextStaus(updateType, REJECTED));
    });
  } else if (updateType === saveType.sportsSpecific) {
    saveCurrentSport({profile, sport}, store, () => {
      store.dispatch(changeSaveDataOnNextStaus(updateType, FULFILLED));
    }, error => {
      console.log('Reson for http error in Save Current sport', error);
      store.dispatch(changeSaveDataOnNextStaus(updateType, REJECTED));
    });
  } else if (updateType === saveType.both) {
    saveProfile(profile, store, () => {
      saveCurrentSport({profile, sport}, store, () => {
        store.dispatch(changeSaveDataOnNextStaus(updateType, FULFILLED));
      }, error => {
        console.log('Reson for http error in Save current sport of updateType Both', error);
        store.dispatch(changeSaveDataOnNextStaus(updateType, REJECTED));
      });
    }, error => {
      console.log('Reson for http error in Save Profile  of updateType Both', error);
      store.dispatch(changeSaveDataOnNextStaus(updateType, REJECTED));
    });
  }
}

