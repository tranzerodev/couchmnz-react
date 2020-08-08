import {
  validateNewAwards
} from '../../actions';
import {UPDATE_UNI_DEGREE, CLEAR_UNI_AWARD, UPDATE_UNI_AWARD} from '../../constants/ActionTypes';

const validateNewAward = store => next => action => {
  next(action);
  switch (action.type) {
    case UPDATE_UNI_AWARD:
    case CLEAR_UNI_AWARD:
    {
      const {newAward} = store.getState();
      store.dispatch(validateNewAwards(newAward));
      break;
    }
    default:break;
  }
};

export default validateNewAward;
