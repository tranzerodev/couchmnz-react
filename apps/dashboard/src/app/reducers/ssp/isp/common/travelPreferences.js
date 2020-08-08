import {UPDATE_TRAVEL_PREFERENCES, CLEAR_TRAVEL_PREFERENCES, SET_TRAVEL_PREFERENCES, SAVE_TRAINING_LOCATIONS, CLEAR_SPORTS_RELATED_STORES} from '../../../../constants/ActionTypes';
import appConstansts from '../../../../constants/appConstants';

const initialState = {
  willingToTravel: null,
  distance: '',
  location: {
    lat: null,
    lng: null
  },
  travelAddress: null,
  cityID: null,
  zip: null,
  unit: appConstansts.distanceUnit.miles,
  cityName: '',
  stateID: null,
  stateName: '',
  countryID: null,
  countryName: ''
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
    case SAVE_TRAINING_LOCATIONS: {
      const {data} = action;
      return Object.assign({}, state, data);
    }
    case CLEAR_SPORTS_RELATED_STORES: {
      return initialState;
    }
    default:
      return state;
  }
}
