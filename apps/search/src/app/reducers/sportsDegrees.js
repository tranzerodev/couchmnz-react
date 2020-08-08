import {SET_SPORTS_DEGREE, ADD_SPORTS_DEGREE, CLEAR_SPORTS_DEGREES, REMOVE_SPORTS_DEGREE} from '../constants/ActionTypes';

const initialState = [];

export default function degrees(state = initialState, action) {
  switch (action.type) {
    case SET_SPORTS_DEGREE: {
      const {degree} = action;
      return degree;
    }
    case ADD_SPORTS_DEGREE: {
      const {data} = action;
      const _state = Object.assign([], state);
      _state.push(data);
      return _state;
    }
    case REMOVE_SPORTS_DEGREE: {
      const {index} = action;
      const items = [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
      return items;
    }
    case CLEAR_SPORTS_DEGREES:
      return initialState;
    default:
      return state;
  }
}
