import {UPDATE_PAYPAL_DETAILS, CLEAR_PAYPAL_DETAILS, SET_PAYPAL_DETAILS} from '../../../../constants/ActionTypes';

const initialState = {email: ''};

export default function bankDetails(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PAYPAL_DETAILS: {
      console.log('PaypalDetails', action.profile);
      const {profile} = action;
      return profile;
    }
    case SET_PAYPAL_DETAILS: {
      const {data} = action;
      return data;
    }
    case CLEAR_PAYPAL_DETAILS:
      return initialState;
    default:
      return state;
  }
}
