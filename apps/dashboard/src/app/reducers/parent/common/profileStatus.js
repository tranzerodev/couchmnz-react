import {FULFILLED, PENDING, REJECTED, ACTIVATE_NEW_PROFILE} from '../../../constants/ActionTypes';
const initialState = {
  status: null
};

const profileStatus = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVATE_NEW_PROFILE + FULFILLED: return Object.assign({}, state, action.payload.data.responseCode === 0 ? {status: FULFILLED} : {status: REJECTED});
    case ACTIVATE_NEW_PROFILE + PENDING: return Object.assign({}, state, {status: PENDING});
    default: return state;
  }
};

export default profileStatus;
