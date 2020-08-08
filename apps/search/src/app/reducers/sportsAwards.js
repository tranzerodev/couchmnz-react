import {SET_SPORTS_AWARDS, ADD_SPORTS_AWARD, REMOVE_SPORTS_AWARD, CLEAR_SPORTS_AWARDS} from '../constants/ActionTypes';

const initialState = [];

export default function awards(state = initialState, action) {
  switch (action.type) {
    case SET_SPORTS_AWARDS: {
      const {certifications} = action;
      return certifications;
    }
    case ADD_SPORTS_AWARD: {
      const {data} = action;
      const _state = Object.assign([], state);
      _state.push(data);
      return _state;
    }
    case REMOVE_SPORTS_AWARD: {
      const {index} = action;
      const items = [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
      return items;
    }
    case CLEAR_SPORTS_AWARDS:
      return initialState;
    default:
      return state;
  }
}
