import {sspValidatePaypalSettings} from '../../actions/index';
import {UPDATE_PAYPAL_DETAILS, SET_PAYPAL_DETAILS} from '../../constants/ActionTypes';
const setStore = store => next => action => {
  next(action);
  switch (action.type) {
    case SET_PAYPAL_DETAILS:
    case UPDATE_PAYPAL_DETAILS: {
      const {paypalDetails} = store.getState();
      store.dispatch(sspValidatePaypalSettings(paypalDetails));
      break;
    }
    default:break;
  }
};

export default setStore;
