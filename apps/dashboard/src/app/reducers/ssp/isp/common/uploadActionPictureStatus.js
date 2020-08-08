import {FULFILLED, REJECTED, PENDING, CHANGE_UPLOAD_ACTION_PICTURE_STATUS, UPLOAD_ACTION_PICTURES} from '../../../../constants/ActionTypes';

const initialState = {status: null};

export default function uploadActionPictureStatus(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_ACTION_PICTURES + FULFILLED : {
      if (action.payload.data.responseCode >= 100) {
        return Object.assign({}, state, {status: REJECTED});
      }
      return Object.assign({}, state, {status: FULFILLED});
    }
    case UPLOAD_ACTION_PICTURES + PENDING : return {status: PENDING};
    case UPLOAD_ACTION_PICTURES + REJECTED : return {status: REJECTED};
    // Case FETCH_PROFILE + PENDING : return {status: PENDING};
    // case FETCH_PROFILE + FULFILLED : return {status: FULFILLED};
    case CHANGE_UPLOAD_ACTION_PICTURE_STATUS: return {status: action.status};
    default:
      return state;
  }
}
