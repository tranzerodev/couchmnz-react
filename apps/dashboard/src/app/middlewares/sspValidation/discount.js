import {
  sspValidateDiscount
} from '../../actions';
import {ADD_DISCOUNT, REMOVE_DISCOUNT, ACTIVATE_DISCOUNT, SSP_DISCOUNT_SUBMIT} from '../../constants/ActionTypes';

const updateProfileData = store => next => action => {
  next(action);
  switch (action.type) {
    case ADD_DISCOUNT:
    case REMOVE_DISCOUNT:
    case ACTIVATE_DISCOUNT:
    case SSP_DISCOUNT_SUBMIT: {
      console.log('store validate');
      store.dispatch(sspValidateDiscount());
      break;
    }
    default: break;
  }
};

export default updateProfileData;
