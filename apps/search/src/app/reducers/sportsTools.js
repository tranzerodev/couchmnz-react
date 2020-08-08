import {SET_SPORTS_TOOLS, ADD_NEW_SPORT_TOOL, REMOVE_SPORTS_TOOL, CLEAR_SPORTS_TOOL} from '../constants/ActionTypes';

const initialState = [];

export default function awards(state = initialState, action) {
  switch (action.type) {
    case SET_SPORTS_TOOLS: {
      const {certifications} = action;
      return certifications;
    }
    case ADD_NEW_SPORT_TOOL: {
      const {data} = action;
      const _state = Object.assign([], state);
      _state.push(data);
      return _state;
    }
    case REMOVE_SPORTS_TOOL: {
      const {index} = action;
      const items = [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
      return items;
    }
    case CLEAR_SPORTS_TOOL:
      return initialState;
    default:
      return state;
  }
}
