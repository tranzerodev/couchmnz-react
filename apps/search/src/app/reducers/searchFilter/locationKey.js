import {UPDATE_LOCATION_KEY, CLEAR_LOCATION_KEY} from '../../constants/ActionTypes';

const initialState = {};

export default function locationKey(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LOCATION_KEY: {
      action.locationKey.dataType = 'locationKey';
      return Object.assign({}, state, action.locationKey);
    }
    case CLEAR_LOCATION_KEY:
      return initialState;
    default:
      return state;
  }
}
