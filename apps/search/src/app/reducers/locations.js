import {UPDATE_LOCATION, CLEAR_LOCATIONS, ADD_LOCATION, REMOVE_LOCATION, SET_LOCATIONS, FULFILLED, PENDING, REJECTED, FETCH_LOCATIONS} from '../constants/ActionTypes';
const initialState = {data: []};

const handleLocationSearch = (locations, id) => {
  return locations.findIndex(location => location.id === id);
};

export default function locations(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LOCATION: {
      const {profile} = action;
      const index = handleLocationSearch(state.data, profile.id);
      const _state = Object.assign([], state.data);
      _state[index] = Object.assign({}, _state[index], profile, {tag: 'TAG'});
      return Object.assign({...state}, {data: _state});
    }
    case ADD_LOCATION: {
      const {location} = action;
      return Object.assign({...state, data: state.data.concat(location)});
    }
    case REMOVE_LOCATION: {
      const {profile} = action;
      return Object.assign({...state, data: state.data.filter(location => location.id !== profile.id)});
    }
    case SET_LOCATIONS: {
      const {locations} = action;
      return {...state, data: locations};
    }
    case FETCH_LOCATIONS + FULFILLED: return Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED});
    case FETCH_LOCATIONS + PENDING : return {data: [], status: PENDING};
    case FETCH_LOCATIONS + REJECTED : return initialState;
    case CLEAR_LOCATIONS:
      return initialState;
    default:
      return state;
  }
}
