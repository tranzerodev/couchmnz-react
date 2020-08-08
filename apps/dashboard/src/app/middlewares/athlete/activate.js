import {
  fetchUserProfiles
} from '../../actions';
import {ACTIVATE_NEW_PROFILE} from '../../constants/ActionTypes';
import {FULFILLED} from '../../constants/ActionTypes';
const activate = store => next => action => {
  next(action);
  switch (action.type) {
    case ACTIVATE_NEW_PROFILE + FULFILLED: {
      if (action.payload.data.responseCode === 0) {
        const {userProfiles} = store.getState();
        if (userProfiles.selectedProfile.type === 'athlete') {
          store.dispatch(fetchUserProfiles());
        }
      }
      break;
    }
    default: break;
  }
};

export default activate;
