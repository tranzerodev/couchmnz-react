import {FULFILLED, SET_SPORTS_TOOL_LIST, CLEAR_SPORTS_TOOLS_LIST} from '../constants/ActionTypes';

const initialState = {data: [], status: null};

export default function certificationsList(state = initialState, action) {
  switch (action.type) {
    case SET_SPORTS_TOOL_LIST: {
      const {data} = action;
      return {data, status: FULFILLED};
    }
    case CLEAR_SPORTS_TOOLS_LIST:
      return initialState;
    default:
      return state;
  }
}
