import {
  sspValidateTravelPreference
} from '../../actions';
import {UPDATE_TRAVEL_PREFERENCES, SET_TRAVEL_PREFERENCES} from '../../constants/ActionTypes';

const updateProfileData = store => next => action => {
  next(action);
  switch (action.type) {
    case SET_TRAVEL_PREFERENCES:
    case UPDATE_TRAVEL_PREFERENCES: {
      const {travelPreferences} = store.getState();
      console.log('store validate');
      store.dispatch(sspValidateTravelPreference({travelPreferences}));
      break;
    }
    default:break;
  }
};

export default updateProfileData;
