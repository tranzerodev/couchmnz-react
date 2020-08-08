import {fetchCurrentSport, postCurrentSport} from '../actions';
import {FULFILLED, POST_CURRENT_SPORT, ADD_LOCATION, UPDATE_LOCATION, REMOVE_LOCATION} from '../constants/ActionTypes';
import {constructCurrentSportData} from './updateCurrentSportUtils';
const sports = store => next => action => {
  next(action);
  switch (action.type) {
    case POST_CURRENT_SPORT + FULFILLED:
    case REMOVE_LOCATION + FULFILLED:
    {
      const {profile, sport} = store.getState();
      if ((action.payload.data.responseCode === 0) || (action.type === POST_CURRENT_SPORT + FULFILLED)) {
        store.dispatch(fetchCurrentSport({profileID: profile.data.profile.id, sportID: sport.id}));
      }
      break;
    }
    case ADD_LOCATION:
    case UPDATE_LOCATION: {
      const storeState = store.getState();
      const {currentSport, profile} = storeState;
      const updatedSport = constructCurrentSportData(storeState);
      store.dispatch(postCurrentSport(updatedSport, {profileID: profile.data.profile.id, sportID: currentSport.data.id}));
      break;
    }
    default:break;
  }
};

export default sports;
