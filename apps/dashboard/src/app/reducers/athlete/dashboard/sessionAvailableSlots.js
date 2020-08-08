import {ATHLETE_FETCH_AVAILABLE_SLOTS, FULFILLED, PENDING, REJECTED} from '../../../constants/ActionTypes';

const initialState = {data: {
  roleName: '',
  ssp: {},
  sport: {},
  skillLevel: {},
  ageGroup: {},
  trainingType: {},
  trainingLocation: {},
  events: []
}, status: null};

export default function availableSlots(state = initialState, action) {
  switch (action.type) {
    case ATHLETE_FETCH_AVAILABLE_SLOTS + FULFILLED: {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      return Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED});
    }
    case ATHLETE_FETCH_AVAILABLE_SLOTS + PENDING: {
      return Object.assign({}, state, {status: PENDING});
    }
    case ATHLETE_FETCH_AVAILABLE_SLOTS + REJECTED: {
      return Object.assign({}, state, {status: REJECTED});
    }
    case ATHLETE_FETCH_AVAILABLE_SLOTS:
      return initialState;
    default:
      return state;
  }
}
