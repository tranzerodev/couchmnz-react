import {UPDATE_BANK_DETAILS, CLEAR_BANK_DETAILS, SET_BANK_DETAILS} from '../constants/ActionTypes';

const initialState = {};

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
    default:
      return state;
  }
}
