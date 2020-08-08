import {FULFILLED, PENDING, REJECTED, SAVE_PARENT_PREFERENCES} from '../../../constants/ActionTypes';
const initialState = {
  status: null
};

const parentAccountStatus = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PARENT_PREFERENCES + FULFILLED: return Object.assign({}, state, action.payload.data.responseCode === 0 ? {status: FULFILLED} : {status: REJECTED});
    case SAVE_PARENT_PREFERENCES + PENDING: return Object.assign({}, state, {status: PENDING});
    default: return state;
  }
};

export default parentAccountStatus;
