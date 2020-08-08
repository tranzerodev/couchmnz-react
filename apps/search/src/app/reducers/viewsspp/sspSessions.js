import {FETCH_SSP_SESSIONS, FULFILLED, PENDING, REJECTED} from '../../constants/ActionTypes';

const initialState = {sessionFilteredList: [],
  status: null};

export default function sspSessions(state = initialState, action) {
  switch (action.type) {
    case FETCH_SSP_SESSIONS + FULFILLED: {
      const {sessionFilteredList} = action.payload.data;
      const newState = Object.assign({}, {sessionFilteredList, status: FULFILLED});
      console.log(newState);
      return (newState);
    }
    case FETCH_SSP_SESSIONS + PENDING: {
      const status = PENDING;
      const newState = Object.assign({}, {status});
      return (newState);
    }
    case FETCH_SSP_SESSIONS + REJECTED: {
      const status = REJECTED;
      const newState = Object.assign({}, {status});
      return (newState);
    }
    default:
      return state;
  }
}
