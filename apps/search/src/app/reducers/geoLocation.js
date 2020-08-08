import {
  FULFILLED,
  REJECTED,
  PENDING,
  FETCH_GEO_LOCATION,
  CLEAR_GEO_LOCATION
} from '../constants/ActionTypes';

const geoLocation = (state = {data: {}}, action) => {
  switch (action.type) {
    case FETCH_GEO_LOCATION + FULFILLED: {
      console.log('state', state, 'action', action);
      let geoLocation = {};
      if (action.payload.data.status === 'OK' && action.payload.data.results && action.payload.data.results.length) {
        geoLocation = Object.assign({}, state, {data: action.payload.data, status: FULFILLED});
      } else {
        geoLocation = Object.assign({}, state, {data: null, status: REJECTED});
      }
      return geoLocation;
    }
    case FETCH_GEO_LOCATION + PENDING : {
      console.log('state', state, 'action', action);
      return {data: {}, status: PENDING};
    }
    case FETCH_GEO_LOCATION + REJECTED : {
      console.log('state', state, 'action', action);
      return {data: {}, status: REJECTED};
    }
    case CLEAR_GEO_LOCATION: return {data: {}};
    default: return state;
  }
};

export default geoLocation;
