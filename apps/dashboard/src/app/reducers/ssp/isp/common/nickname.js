import {FULFILLED, REJECTED, PENDING, VERIFY_NICKNAME, SSP_SET_NICKNAME} from '../../../../constants/ActionTypes';
const initialState = {};
const nickname = (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_NICKNAME + FULFILLED : {
      const nickname = {data: action.payload.data.payload, status: FULFILLED};
      return nickname;
    }
    case VERIFY_NICKNAME + PENDING : {
      const nickname = {data: {}, status: PENDING};
      return nickname;
    }
    case VERIFY_NICKNAME + REJECTED : {
      const nickname = {data: {}, status: REJECTED};
      return nickname;
    }
    case SSP_SET_NICKNAME: {
      const nickname = {data: action.data, status: FULFILLED};
      return nickname;
    }
    default:
      return state;
  }
};

export default nickname;

