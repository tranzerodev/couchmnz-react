import {FULFILLED, REJECTED, PENDING, ISP_FETCH_SESSION_GROUP_SIZE} from '../../../../constants/ActionTypes';

const initialState = {
  data: {
    prices: []
  },
  status: null
};

export default function sessionGroupSizes(state = initialState, action) {
  switch (action.type) {
    case ISP_FETCH_SESSION_GROUP_SIZE + FULFILLED : {
      if (action.payload.data.responseCode >= 100) {
        return Object.assign({}, initialState, {status: REJECTED});
      }
      const data = action.payload.data.payload;
      return Object.assign({}, state, {data, status: FULFILLED});
    }
    case ISP_FETCH_SESSION_GROUP_SIZE + PENDING : return Object.assign({}, initialState, {status: PENDING});
    case ISP_FETCH_SESSION_GROUP_SIZE + REJECTED : return Object.assign({}, initialState, {status: REJECTED});
    default:
      return state;
  }
}
