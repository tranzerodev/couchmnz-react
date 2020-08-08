import {SSP_SET_PRESENT_NICKNAME, FULFILLED, PENDING, SAVE_ACCOUNT_DETAILS} from '../../../../constants/ActionTypes';
const initialState = {nickname: null, status: PENDING};
const nickname = (state = initialState, action) => {
  switch (action.type) {
    case SSP_SET_PRESENT_NICKNAME: {
      const nickname = {nickname: action.data, status: FULFILLED};
      return nickname;
    }
    case SAVE_ACCOUNT_DETAILS: {
      const nickname = {nickname: action.nickname, status: FULFILLED};
      return nickname;
    }
    default:
      return state;
  }
};

export default nickname;

