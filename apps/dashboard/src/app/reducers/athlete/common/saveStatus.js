import {SAVE_ATHLETE_PROFILE, FULFILLED, PENDING, REJECTED, SAVE_ATHLETE_PREFERENCES, SAVE_ATHLETE_ACCOUNT} from '../../../constants/ActionTypes';

const initialState = {
  type: null,
  status: null
};

const saveStatus = (state = initialState, action) => {
  const {type} = action;
  switch (type) {
    case SAVE_ATHLETE_PROFILE + FULFILLED:
    case SAVE_ATHLETE_PREFERENCES + FULFILLED:
    case SAVE_ATHLETE_ACCOUNT + FULFILLED:
    {
      const {responseCode} = action.payload.data;
      return Object.assign({}, responseCode > 0 ? {type, status: REJECTED} : {type, status: FULFILLED});
    }
    case SAVE_ATHLETE_PROFILE + REJECTED:
    case SAVE_ATHLETE_PREFERENCES + REJECTED:
    case SAVE_ATHLETE_ACCOUNT + REJECTED:
    {
      return Object.assign({}, {type, status: REJECTED});
    }
    case SAVE_ATHLETE_PROFILE + PENDING:
    case SAVE_ATHLETE_PREFERENCES + PENDING:
    case SAVE_ATHLETE_ACCOUNT + PENDING:
    {
      return Object.assign({}, {type, status: PENDING});
    }
    default:
      return state;
  }
};

export default saveStatus;
