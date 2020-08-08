import {UPDATE_TRAVEL_PREFERENCES, CLEAR_TRAVEL_PREFERENCES, SET_TRAVEL_PREFERENCES} from '../constants/ActionTypes';

const initialState = {
  willingToTravel: null,
  distance: null,
  location: {
    lat: null,
    lng: null
  },
  travelAddress: null
};

export default function listing(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TRAVEL_PREFERENCES: {
      /* Console.log('action', action); */
      const {profile} = action;
      return Object.assign({}, state, profile);
    }
    case CLEAR_TRAVEL_PREFERENCES: {
      /* Console.log('clear'); */
      return initialState;
    }
    case SET_TRAVEL_PREFERENCES: {
      /* Console.log('action', action); */
      const {data} = action;
      return Object.assign({}, state, data);
    }
    default:
      return state;
  }
}
