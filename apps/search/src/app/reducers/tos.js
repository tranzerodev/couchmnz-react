import {PENDING, FETCH_TOS, FULFILLED, REJECTED} from '../constants/ActionTypes';

const initialState = {
  data: '',
  status: ''
};
const tos = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOS + PENDING : {
      return Object.assign({}, state, {email: action.meta, status: PENDING});
    }
    case FETCH_TOS + FULFILLED : {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      const data = action.payload.data.payload;
      return Object.assign({}, state, {status: FULFILLED, data});
    }
    case FETCH_TOS + REJECTED : {
      return Object.assign({}, state, {status: REJECTED});
    }
    default:
      return state;
  }
};

export default tos;

