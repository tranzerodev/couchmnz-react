import {UPDATE_BANK_DETAILS, CLEAR_BANK_DETAILS, SET_BANK_DETAILS, SAVE_BANK_PAYOUT_DETAILS} from '../../../../constants/ActionTypes';

const initialState = {
  firstName: null,
  lastName: null,
  type: null,
  bank: null,
  holder: null,
  routingNumber: null,
  accountNumber: null,
  nickName: null
};

export default function bankDetails(state = initialState, action) {
  switch (action.type) {
    case UPDATE_BANK_DETAILS: {
      /* Console.log(action.profile); */
      return Object.assign({}, state, action.profile);
    }
    case SET_BANK_DETAILS: {
      /* Console.log(action.profile); */
      return Object.assign({}, state, action.data);
    }
    case CLEAR_BANK_DETAILS:
      return initialState;
    case SAVE_BANK_PAYOUT_DETAILS: {
      return Object.assign({}, state, action.bankDetails);
    }
    default:
      return state;
  }
}
