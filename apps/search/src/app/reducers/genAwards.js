import {SET_GEN_AWARDS, ADD_NEW_GEN_AWARD, REMOVE_GEN_AWARD, CLEAR_GEN_AWARDS} from '../constants/ActionTypes';

const initialState = [];

export default function awards(state = initialState, action) {
  switch (action.type) {
    case SET_GEN_AWARDS: {
      const {certifications} = action;
      return certifications;
    }
    case ADD_NEW_GEN_AWARD: {
      const {data} = action;
      const _state = Object.assign([], state);
      _state.push(data);
      return _state;
    }
    case REMOVE_GEN_AWARD: {
      const {index} = action;
      const items = [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
      return items;
    }
    case CLEAR_GEN_AWARDS:
      return initialState;
    default:
      return state;
  }
}
