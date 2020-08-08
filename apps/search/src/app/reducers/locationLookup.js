import {FULFILLED, PENDING, REJECTED, FETCH_LOCATION_REVERSE_LOOKUP_DATA, UPDATE_BROWSER_GPS_PLUGIN_DATA} from '../constants/ActionTypes';

const initialState = {
  data: {
    countryName: '',
    regionName: '',
    city: '',
    longitude: null,
    latitude: null
  },
  status: null
};
export default function locationLookup(state = initialState, action) {
  switch (action.type) {
    case FETCH_LOCATION_REVERSE_LOOKUP_DATA + PENDING: {
      return Object.assign({}, state, {status: PENDING});
    }
    case FETCH_LOCATION_REVERSE_LOOKUP_DATA + FULFILLED: {
      const data = action.payload.data.payload;
      return Object.assign({}, state, {data, status: FULFILLED});
    }
    case FETCH_LOCATION_REVERSE_LOOKUP_DATA + REJECTED: {
      return Object.assign({}, state, {status: REJECTED});
    }
    case UPDATE_BROWSER_GPS_PLUGIN_DATA: {
      const {latitude, longitude} = action.coords;
      const data = Object.assign({}, state.data, {latitude, longitude});
      return Object.assign({}, state, {data, status: FULFILLED});
    }
    default:
      return state;
  }
}

