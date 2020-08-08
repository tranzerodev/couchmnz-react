import {SSP_SET_PRESENT_NICKNAME, FULFILLED, PENDING} from '../constants/ActionTypes';
const initialState = {data: null, status: PENDING};
const nickname = (state = initialState, action) => {
  switch (action.type) {
    case SSP_SET_PRESENT_NICKNAME: {
      const nickname = {nickname: action.data, status: FULFILLED};
      return nickname;
    }
    default:
      return state;
  }
};

export default nickname;

