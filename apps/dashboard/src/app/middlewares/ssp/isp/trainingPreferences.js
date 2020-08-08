
import {fetchTrainingList} from '../../../actions';
import {FETCH_CURRENT_SPORT, FULFILLED} from '../../../constants/ActionTypes';

const trainingPreferences = store => next => action => {
  next(action);

  switch (action.type) {
    case FETCH_CURRENT_SPORT + FULFILLED : {
      const {responseCode, payload} = action.payload.data;
      if (responseCode > 0) {
        break;
      }
      store.dispatch(fetchTrainingList(payload.id));
      break;
    }
    default: {
      break;
    }
  }
};

export default trainingPreferences;
