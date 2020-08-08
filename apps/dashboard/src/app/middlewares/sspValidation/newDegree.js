import {
  validateNewDegree
} from '../../actions';
import {UPDATE_UNI_DEGREE, CLEAR_UNI_AWARD, CLEAR_UNI_DEGREE} from '../../constants/ActionTypes';

const updateProfileData = store => next => action => {
  next(action);
  switch (action.type) {
    case UPDATE_UNI_DEGREE:
    case CLEAR_UNI_DEGREE:
    {
      const {newDegree} = store.getState();
      store.dispatch(validateNewDegree(newDegree));
      break;
    }
    default:break;
  }
};

export default updateProfileData;
