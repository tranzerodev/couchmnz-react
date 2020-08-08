import {FETCH_REASONS, CLEAR_REASONS, FULFILLED, REJECTED, PENDING} from '../../../../constants/ActionTypes';

const initialState = {data: []};

export default function reasons(state = initialState, action) {
  switch (action.type) {
    case FETCH_REASONS + FULFILLED: {
      const data = action.payload.data.responseCode === 0 ? action.payload.data.payload : [];
      return Object.assign({}, state, {data, status: FULFILLED});
    }
    case FETCH_REASONS + PENDING : return {data: [], status: PENDING};
    case FETCH_REASONS + REJECTED : return {data: [], status: REJECTED};
    case CLEAR_REASONS:
      return initialState;
    default:
      return state;
  }
}
