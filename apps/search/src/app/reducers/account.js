import {UPDATE_ACCOUNT, CLEAR_ACCOUNT} from '../constants/ActionTypes';

const initialState = {};

export default function account(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ACCOUNT: {
      /* Console.log(action.profile); */
      return Object.assign({}, state, action.profile);
    }
    case CLEAR_ACCOUNT:
      return initialState;
    default:
      return state;
  }
}
