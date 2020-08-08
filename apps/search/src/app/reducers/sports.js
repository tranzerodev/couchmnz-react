import {SET_SPORTS, ADD_NEW_SPORT} from '../constants/ActionTypes';
const initialState = [];

export default function sports(state = initialState, action) {
  switch (action.type) {
    case SET_SPORTS: return action.sports;
    case ADD_NEW_SPORT: return state.findIndex(sport => sport.id === action.sport.id) >= 0 ? state : state.concat(action.sport);
    default: return state;
  }
}
