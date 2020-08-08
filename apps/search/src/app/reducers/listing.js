import {UPDATE_LISTING, CLEAR_LISTING, SET_LISTING, UPDATE_NICKNAME} from '../constants/ActionTypes';

const initialState = {};

export default function listing(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LISTING: {
      /* Console.log('action', action); */
      const {profile} = action;
      return Object.assign({}, state, profile);
    }
    case CLEAR_LISTING: {
      /* Console.log('clear'); */
      return initialState;
    }
    case UPDATE_NICKNAME: {
      /* Console.log('action', action); */
      const {profile} = action;
      return Object.assign({}, state, profile);
    }
    case SET_LISTING: {
      const {listing} = action;
      return listing;
    }
    default:
      return state;
  }
}
