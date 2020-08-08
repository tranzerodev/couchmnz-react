import {SET_SPORTS_AFFILIATION, ADD_NEW_SPORTS_AFFILIATION, REMOVE_SPORTS_AFFILIATION, CLEAR_SPORTS_AFFILIATION} from '../constants/ActionTypes';

const initialState = [];

export default function awards(state = initialState, action) {
  switch (action.type) {
    case SET_SPORTS_AFFILIATION: {
      const {certifications} = action;
      return certifications;
    }
    case ADD_NEW_SPORTS_AFFILIATION: {
      const {data} = action;
      const _state = Object.assign([], state);
      _state.push(data);
      return _state;
    }
    case REMOVE_SPORTS_AFFILIATION: {
      const {index} = action;
      const items = [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
      return items;
    }
    case CLEAR_SPORTS_AFFILIATION:
      return initialState;
    default:
      return state;
  }
}
