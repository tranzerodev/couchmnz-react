import {FULFILLED, CLEAR_SPORTS_CERTIFICATIONS_LIST, FETCH_SPORTS_CERTIFICATIONS_LIST} from '../constants/ActionTypes';

const initialState = {data: [], status: null};

export default function sportsCertificationsList(state = initialState, action) {
  switch (action.type) {
    case FETCH_SPORTS_CERTIFICATIONS_LIST + FULFILLED : {
      const filter = action.payload.data.payload;
      const newStatus = Object.assign({}, state, {data: filter, status: FULFILLED});
      return newStatus;
    }
    case CLEAR_SPORTS_CERTIFICATIONS_LIST:
      return initialState;
    default:
      return state;
  }
}
