import {FETCH_ATHLETE_ACCOUNT, CLEAR_ATHLETE_ACCOUNT, SET_ATHLETE_ACCOUNT, FULFILLED, PENDING, REJECTED} from '../../../constants/ActionTypes';

const initialState = {
  data: {
    firstName: null,
    lastName: null,
    gender: null,
    country: {
      id: null,
      name: null
    },
    state: {
      id: null,
      name: null
    },
    city: {
      id: null,
      name: null
    },
    address: null,
    zipCode: null,
    timezone: {
      id: null,
      name: null
    },
    mobile: null,
    landLine: null,
    canSendReminder: null,
    canReceiveMarketingCall: null
  },
  status: null
};

const athleteAccount = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ATHLETE_ACCOUNT + FULFILLED: {
      const data = action.payload.data.payload;
      const {responseCode} = action.payload.data;
      const account = Object.assign({}, state, responseCode > 0 ? {status: REJECTED} : {data, status: FULFILLED});
      return account;
    }
    case FETCH_ATHLETE_ACCOUNT + PENDING: {
      const account = Object.assign({}, state, {status: PENDING});
      return account;
    }
    case CLEAR_ATHLETE_ACCOUNT: {
      return initialState;
    }
    case SET_ATHLETE_ACCOUNT: {
      const {data} = action;
      return data;
    }
    default:
      return state;
  }
};

export default athleteAccount;
