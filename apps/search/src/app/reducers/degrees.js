import {UPDATE_DEGREE, CLEAR_DEGREES, ADD_NEW_DEGREE, SET_DEGREE, ADD_DEGREE, REMOVE_UNI_DEGREE} from '../constants/ActionTypes';

const initialState = [];

export default function degrees(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DEGREE: {
      /* Console.log('action', action); */
      const {profile, index} = action;
      const _state = Object.assign([], state);
      _state[index] = Object.assign({}, _state[index], profile);
      /* Console.log('_state', _state); */
      return Object.assign([], state, _state);
    }
    case ADD_NEW_DEGREE: {
      return Object.assign([], state.concat({
        id: '',
        name: ''
      }));
    }
    case SET_DEGREE: {
      const {degree} = action;
      return degree;
    }
    case ADD_DEGREE: {
      const {data} = action;
      const _state = Object.assign([], state);
      _state.push(data);
      return _state;
    }
    case REMOVE_UNI_DEGREE: {
      const {index} = action;
      const items = [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
      return items;
    }
    case CLEAR_DEGREES:
      return initialState;
    default:
      return state;
  }
}
