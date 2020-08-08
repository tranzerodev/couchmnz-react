import {FETCH_ATHLETE_PROFILE, CLEAR_ATHLETE_PROFILE, SET_ATHLETE_PROFILE, FULFILLED, PENDING, REJECTED} from '../../../constants/ActionTypes';

const initialState = {
  data: {
    isActive: null,
    sports: [],
    firstName: null,
    lastName: null,
    gender: null,
    dob: null,
    profileImage: null,
    country: {
      id: null,
      name: null
    },
    grade: null,
    height: {
      value: null,
      unit: null
    },
    weight: {
      value: null,
      unit: null
    }
  },
  status: null
};

const athleteProfile = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ATHLETE_PROFILE + FULFILLED: {
      const data = action.payload.data.payload;
      const {responseCode} = action.payload.data;
      const profile = Object.assign({}, state, responseCode > 0 ? {status: REJECTED} : {data, status: FULFILLED});
      return profile;
    }
    case FETCH_ATHLETE_PROFILE + PENDING: {
      const profile = Object.assign({}, state, {status: PENDING});
      return profile;
    }
    case CLEAR_ATHLETE_PROFILE: {
      return initialState;
    }
    case SET_ATHLETE_PROFILE: {
      const {data} = action;
      return data;
    }
    default:
      return state;
  }
};

export default athleteProfile;
