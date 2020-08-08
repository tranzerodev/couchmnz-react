import {
  SET_CANCELLATION_POLICIES,
  ADD_CANCELLATION_POLICY,
  CLEAR_CANCELLATION_POLICIES,
  FETCH_CANCELLATION_POLICIES,
  FULFILLED,
  REJECTED,
  PENDING
} from '../constants/ActionTypes';

const initialState = {data: []};
const cancellationPolicies = (state = initialState, action) => {
  switch (action.type) {
    case SET_CANCELLATION_POLICIES: return Object.assign([], state, action.states);
    case FETCH_CANCELLATION_POLICIES + FULFILLED: return Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED});
    case FETCH_CANCELLATION_POLICIES + PENDING : return {data: [], status: PENDING};
    case FETCH_CANCELLATION_POLICIES + REJECTED : return {data: [], status: REJECTED};
    case ADD_CANCELLATION_POLICY: return [...state, action.state];
    case CLEAR_CANCELLATION_POLICIES: return Object.assign({}, initialState);
    default: return state;
  }
};

export default cancellationPolicies;
