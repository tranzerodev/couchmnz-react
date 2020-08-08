import {UPDATE_FILTER_DISTANCE, CLEAR_FILTER_DISTANCE} from '../../constants/ActionTypes';

const initialState = {};

export default function distance(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FILTER_DISTANCE: {
      action.distance.dataType = 'distance';      
      return Object.assign({}, state, action.distance);
    }
    case CLEAR_FILTER_DISTANCE:
      return initialState;
    default:
      return state;
  }
}
