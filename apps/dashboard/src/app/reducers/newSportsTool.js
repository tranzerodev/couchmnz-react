import {UPDATE_NEW_SPORTS_TOOLS, CLEAR_NEW_TOOLS} from '../constants/ActionTypes';

const initialState = {
  id: '',
  name: ''
};

export default function tool(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NEW_SPORTS_TOOLS: {
      const {updatedData} = action;
      return Object.assign({}, state, updatedData);
    }
    case CLEAR_NEW_TOOLS:
      return initialState;
    default:
      return state;
  }
}
