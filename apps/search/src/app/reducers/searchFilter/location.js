import {UPDATE_LOCATION_LL, CLEAR_LOCATION_LL} from '../../constants/ActionTypes';

const initialState = {};

export default function location(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LOCATION_LL: {
      return Object.assign({}, state, action.location);
    }
    case CLEAR_LOCATION_LL:
      return initialState;
    default:
      return state;
  }
}
