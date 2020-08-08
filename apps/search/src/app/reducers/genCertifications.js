import {SET_GEN_CERTIFICATIONS, ADD_NEW_GEN_CERTIFICATION, REMOVE_GEN_CERTIFICATION, CLEAR_GEN_CERTIFICATIONS} from '../constants/ActionTypes';

const initialState = [];

export default function certifications(state = initialState, action) {
  switch (action.type) {
    case SET_GEN_CERTIFICATIONS: {
      const {certifications} = action;
      return certifications;
    }
    case ADD_NEW_GEN_CERTIFICATION: {
      const {data} = action;
      const _state = Object.assign([], state);
      _state.push(data);
      return _state;
    }
    case REMOVE_GEN_CERTIFICATION: {
      const {index} = action;
      const items = [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
      return items;
    }
    case CLEAR_GEN_CERTIFICATIONS:
      return initialState;
    default:
      return state;
  }
}
