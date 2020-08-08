import {FULFILLED, REJECTED, PENDING, ISP_REVIEW_MASTER} from '../constants/ActionTypes';

const initialState = {data: {}, status: null};

export default function addNewMasterData(state = initialState, action) {
  switch (action.type) {
    case ISP_REVIEW_MASTER + FULFILLED : {
      if (action.payload.data.responseCode >= 100) {
        return Object.assign({}, state, {status: REJECTED});
      }
      return Object.assign({}, state, {status: FULFILLED});
    }
    case ISP_REVIEW_MASTER + PENDING : return {status: PENDING};
    case ISP_REVIEW_MASTER + REJECTED : return {status: REJECTED};
    default:
      return state;
  }
}
