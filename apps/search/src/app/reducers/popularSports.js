import {FULFILLED, PENDING, REJECTED, FETCH_POPULAR_SPORTS} from '../constants/ActionTypes';

const initialState = {
  data: [
    {
      sportId: '58e4b35fdb252928067b42d1',
      hits: '8',
      name: 'Australian Football'
    },
    {
      sportId: '58e4b35fdb252928067b42d9',
      hits: '6',
      name: 'Boating'
    }
  ],
  status: null
};
export default function popularSports(state = initialState, action) {
  switch (action.type) {
    case FETCH_POPULAR_SPORTS + PENDING: {
      return Object.assign({}, state, {status: PENDING});
    }
    case FETCH_POPULAR_SPORTS + FULFILLED: {
      const data = action.payload.data.payload.popularSports;
      return Object.assign({}, state, {data, status: FULFILLED});
    }
    case FETCH_POPULAR_SPORTS + REJECTED: {
      return Object.assign({}, state, {status: REJECTED});
    }
    default:
      return state;
  }
}

