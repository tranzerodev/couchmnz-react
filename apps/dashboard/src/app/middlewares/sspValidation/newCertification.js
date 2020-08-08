import {
  validateNewCertification
} from '../../actions';
import {UPDATE_NEW_CERTIFICATION, CLEAR_NEW_CERTIFICATION} from '../../constants/ActionTypes';

const validateNewCertificationData = store => next => action => {
  next(action);
  switch (action.type) {
    case UPDATE_NEW_CERTIFICATION:
    case CLEAR_NEW_CERTIFICATION:
    {
      const {newCertification} = store.getState();
      store.dispatch(validateNewCertification(newCertification));
      break;
    }
    default:break;
  }
};

export default validateNewCertificationData;
