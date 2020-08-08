import {SAVE_PARENT_PROFILE, FULFILLED, PENDING, REJECTED, SAVE_PARENT_PREFERENCES, SAVE_PARENT_ACCOUNT} from '../../../constants/ActionTypes';

const initialState = {
  type: null,
  status: null
};

const saveStatus = (state = initialState, action) => {
  const {type} = action;
  switch (type) {
    case SAVE_PARENT_PROFILE + FULFILLED:
    case SAVE_PARENT_PREFERENCES + FULFILLED:
    case SAVE_PARENT_ACCOUNT + FULFILLED:
    {
      const {responseCode} = action.payload.data;
      return Object.assign({}, responseCode > 0 ? {type, status: REJECTED} : {type, status: FULFILLED});
    }
    case SAVE_PARENT_PROFILE + REJECTED:
    case SAVE_PARENT_PREFERENCES + REJECTED:
    case SAVE_PARENT_ACCOUNT + REJECTED:
    {
      return Object.assign({}, {type, status: REJECTED});
    }
    case SAVE_PARENT_PROFILE + PENDING:
    case SAVE_PARENT_PREFERENCES + PENDING:
    case SAVE_PARENT_ACCOUNT + PENDING:
    {
      return Object.assign({}, {type, status: PENDING});
    }
    default:
      return state;
  }
};

export default saveStatus;
