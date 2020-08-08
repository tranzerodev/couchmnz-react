import {CLEAR_SPORTS_AWARDS_LIST, FULFILLED, SET_SPORTS_AWARDS_LIST} from '../constants/ActionTypes';

const initialState = {data: [], status: null};

export default function certificationsList(state = initialState, action) {
  switch (action.type) {
    case SET_SPORTS_AWARDS_LIST: {
      const {data} = action;
      return {data, status: FULFILLED};
    }
    case CLEAR_SPORTS_AWARDS_LIST:
      return initialState;
    default:
      return state;
  }
}
