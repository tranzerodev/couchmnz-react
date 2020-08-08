import {PENDING, FETCH_BASIC_USER_INFO, FULFILLED, REJECTED, LOGOUT} from '../../constants/ActionTypes';

const initialState = {
  data: {},
  status: ''
};

const userInfo = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BASIC_USER_INFO + PENDING : {
      return Object.assign({}, state, {status: PENDING});
    }
    case FETCH_BASIC_USER_INFO + FULFILLED : {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      return Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED});
    }
    case FETCH_BASIC_USER_INFO + REJECTED : {
      return Object.assign({}, state, {status: REJECTED});
    }
    case LOGOUT : return initialState;
    default:
      return state;
  }
};

export default userInfo;

