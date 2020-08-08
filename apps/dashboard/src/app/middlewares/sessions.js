import {fetchSessions} from '../actions';
import {FULFILLED, POST_SESSION} from '../constants/ActionTypes';
const sessions = store => next => action => {
  next(action);
  switch (action.type) {
    case POST_SESSION + FULFILLED:
    {
      // Const {userIDs, sport} = store.getState();
      const {userProfiles, currentSport} = store.getState();
      if (action.payload.data.responseCode === 0) {
        // If (action.payload.data.payload.states && action.payload.data.payload.states.length) {
        //   break;
        // }
        // Store.dispatch(fetchSessions({profileID: userIDs.data.coachIDs[0].id, sportID: sport.id}));
        store.dispatch(fetchSessions({profileID: userProfiles.selectedProfile.id, sportID: currentSport.data.id}));
      }
      break;
    }
    default:break;
  }
};

export default sessions;
