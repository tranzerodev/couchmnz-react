import {ATHLETE_FETCH_ORDER_SESSIONS, FULFILLED, PENDING, REJECTED} from '../../../constants/ActionTypes';

const initialState = {data: {
  order: {},
  ssp: {},
  sport: {},
  skillLevel: {},
  ageGroup: {},
  trainingType: {},
  sessions: [],
  trainingLocation: {}
}, status: null};

export default function order(state = initialState, action) {
  switch (action.type) {
    case ATHLETE_FETCH_ORDER_SESSIONS + FULFILLED: {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      return Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED});
    }
    case ATHLETE_FETCH_ORDER_SESSIONS + PENDING: {
      return Object.assign({}, state, {status: PENDING});
    }
    case ATHLETE_FETCH_ORDER_SESSIONS + REJECTED: {
      return Object.assign({}, state, {status: REJECTED});
    }
    case ATHLETE_FETCH_ORDER_SESSIONS:
      return initialState;
    default:
      return state;
  }
}
