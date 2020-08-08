import {SET_GEN_TOOLS, ADD_NEW_GEN_TOOL, REMOVE_GEN_TOOL, CLEAR_GEN_TOOLS} from '../constants/ActionTypes';

const initialState = [];

export default function awards(state = initialState, action) {
  switch (action.type) {
    case SET_GEN_TOOLS: {
      const {certifications} = action;
      return certifications;
    }
    case ADD_NEW_GEN_TOOL: {
      const {data} = action;
      const _state = Object.assign([], state);
      _state.push(data);
      return _state;
    }
    case REMOVE_GEN_TOOL: {
      const {index} = action;
      const items = [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
      return items;
    }
    case CLEAR_GEN_TOOLS:
      return initialState;
    default:
      return state;
  }
}
