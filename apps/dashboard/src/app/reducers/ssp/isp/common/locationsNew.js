import {ISP_FETCH_LOCATION, FULFILLED, REJECTED, PENDING} from '../../../../constants/ActionTypes';

const initialState = {data: []};

export default function locationsNew(state = initialState, action) {
  switch (action.type) {
    case ISP_FETCH_LOCATION + FULFILLED: {
      const data = action.payload.data.responseCode === 0 ? action.payload.data.payload : [];
      return Object.assign({}, state, {data, status: FULFILLED});
    }
    case ISP_FETCH_LOCATION + PENDING : return {data: [], status: PENDING};
    case ISP_FETCH_LOCATION + REJECTED : return {data: [], status: REJECTED};
    default:
      return state;
  }
}
