import {
  fetchCurrentSport
} from '../actions';

import config from '../config';
import {FULFILLED, SAVE_SPORT_EXPERIENCE_YEAR} from '../constants/ActionTypes';

const biography = store => next => action => {
  next(action);
  const {currentSport, userProfiles} = store.getState();
  const sportID = currentSport.status === FULFILLED ? currentSport.data.id : '';
  switch (action.type) {
    case SAVE_SPORT_EXPERIENCE_YEAR + FULFILLED : {
      if (action.payload.data.responseCode === 0) {
        if (userProfiles.selectedProfile && userProfiles.selectedProfile.type === config.userTypes.ssp.sspSubTypes.ISP) {
          store.dispatch(fetchCurrentSport({profileID: userProfiles.selectedProfile.id, sportID}));
        }
      }
      break;
    }
    default:break;
  }
};

export default biography;
