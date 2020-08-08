import {FETCH_ATHLETE_PREFERENCES, CLEAR_ATHLETE_PREFERENCES, SET_ATHLETE_PREFERENCES, FULFILLED, PENDING, REJECTED} from '../../../constants/ActionTypes';

const initialState = {
  data: {
    isActive: null,
    id: null,
    name: null,
    specializations: [],
    yearOfExperience: null,
    skillLevel: {
      id: null,
      name: null
    },
    notes: null,
    preferences: {
      sspSubTypes: [],
      otherTypes: [],
      trainerGenders: [],
      travelPref: {
        distance: null,
        unit: null,
        travelFrom: {
          address: null,
          latlon: {
            lat: null,
            lon: null
          }
        }
      }
    }
  },
  status: null
};

const athletePreferences = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ATHLETE_PREFERENCES + FULFILLED: {
      const data = action.payload.data.payload;
      const {responseCode} = action.payload.data;
      const preferences = Object.assign({}, state, responseCode > 0 ? {status: REJECTED} : {data, status: FULFILLED});
      return preferences;
    }
    case FETCH_ATHLETE_PREFERENCES + PENDING: {
      const preferences = Object.assign({}, state, {status: PENDING});
      return preferences;
    }
    case CLEAR_ATHLETE_PREFERENCES: {
      return initialState;
    }
    case SET_ATHLETE_PREFERENCES: {
      const {data} = action;
      return Object.assign({}, state, {data, status: FULFILLED});
    }
    default:
      return state;
  }
};

export default athletePreferences;
