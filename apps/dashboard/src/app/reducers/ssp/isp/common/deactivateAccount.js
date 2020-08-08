import {DEACTIVATE_ACCOUNT, PENDING, REJECTED, FULFILLED} from '../../../../constants/ActionTypes';

const initialState = {
  status: ''
};
export default function deactivateAccount(state = initialState, action) {
  switch (action.type) {
    case DEACTIVATE_ACCOUNT + PENDING: {
      const newState = Object.assign({}, initialState, {status: PENDING});
      return newState;
    }
    case DEACTIVATE_ACCOUNT + REJECTED: {
      const newState = Object.assign({}, initialState, {status: REJECTED});
      return newState;
    }
    case DEACTIVATE_ACCOUNT + FULFILLED: {
      let status;
      if (action.payload.data.responseCode > 0) {
        status = REJECTED;
      } else {
        status = FULFILLED;
      }
      const newState = Object.assign({}, initialState, status);
      return newState;
    }
    default:
      return state;
  }
}
