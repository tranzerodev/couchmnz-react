import {FULFILLED, PENDING, REJECTED, FETCH_NEARBY_LOCATIONS} from '../constants/ActionTypes';

const initialState = {
  data: {
    worldRegion: null,
    country: null,
    state: null,
    localRegion: [],
    city: null,
    long: null,
    lat: null
  },
  status: null
};
export default function locationLookup(state = initialState, action) {
  switch (action.type) {
    case FETCH_NEARBY_LOCATIONS + PENDING: {
      return Object.assign({}, state, {status: PENDING});
    }
    case FETCH_NEARBY_LOCATIONS + FULFILLED: {
      const data = action.payload.data.payload;
      return Object.assign({}, state, {data, status: FULFILLED});
    }
    case FETCH_NEARBY_LOCATIONS + REJECTED: {
      return Object.assign({}, state, {status: REJECTED});
    }

    default:
      return state;
  }
}

