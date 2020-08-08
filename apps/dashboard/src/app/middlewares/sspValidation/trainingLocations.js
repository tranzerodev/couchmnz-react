import {
  sspValidateTrainingLocations
} from '../../actions';
import {UPDATE_LOCATION, CLEAR_LOCATIONS, ADD_LOCATION, REMOVE_LOCATION, SET_LOCATIONS, FETCH_LOCATIONS, SSP_TRAINING_LOCATIONS_SUBMIT} from '../../constants/ActionTypes';

const updateProfileData = store => next => action => {
  next(action);
  switch (action.type) {
    case UPDATE_LOCATION:
    case CLEAR_LOCATIONS:
    case ADD_LOCATION:
    case REMOVE_LOCATION:
    case SET_LOCATIONS:
    case FETCH_LOCATIONS:
    case SSP_TRAINING_LOCATIONS_SUBMIT: {
      console.log('store validate');
      const {locations} = store.getState();
      store.dispatch(sspValidateTrainingLocations(locations));
      break;
    }
    default:break;
  }
};

export default updateProfileData;
