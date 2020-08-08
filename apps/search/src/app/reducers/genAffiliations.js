import {SET_GEN_AFFILIATION, ADD_NEW_GEN_AFFILIATION, REMOVE_GEN_AFFILIATION, CLEAR_GEN_AFFILIATION} from '../constants/ActionTypes';

const initialState = [];

export default function awards(state = initialState, action) {
  switch (action.type) {
    case SET_GEN_AFFILIATION: {
      const {certifications} = action;
      return certifications;
    }
    case ADD_NEW_GEN_AFFILIATION: {
      const {data} = action;
      const _state = Object.assign([], state);
      _state.push(data);
      return _state;
    }
    case REMOVE_GEN_AFFILIATION: {
      const {index} = action;
      const items = [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
      return items;
    }
    case CLEAR_GEN_AFFILIATION:
      return initialState;
    default:
      return state;
  }
}
