import {FULFILLED, REJECTED, FETCH_TIMEZONES, PENDING} from '../constants/ActionTypes';
const initialState = {status: null, data: []};
const timezones = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TIMEZONES + FULFILLED : {
      const timezones = {data: action.payload.data.payload, status: FULFILLED};
      return timezones;
    }
    case FETCH_TIMEZONES + PENDING : {
      const timezones = {data: [], status: PENDING};
      return timezones;
    }
    case FETCH_TIMEZONES + REJECTED : {
      const timezones = {data: [], status: REJECTED};
      return timezones;
    }
    default:
      return state;
  }
};

export default timezones;

