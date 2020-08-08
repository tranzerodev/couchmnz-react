import {CLEAR_CERTIFICATIONS_LIST, FULFILLED, PENDING, REJECTED, SET_CERTIFICATIONS_LIST} from '../constants/ActionTypes';

const initialState = {data: [], status: null};

export default function certificationsList(state = initialState, action) {
  switch (action.type) {
    case SET_CERTIFICATIONS_LIST: {
      const {certificationsList} = action.profile;
      return {data: certificationsList, status: FULFILLED};
    }
    case CLEAR_CERTIFICATIONS_LIST:
      return initialState;
    default:
      return state;
  }
}
