import {UPDATE_LISTING, CLEAR_LISTING, SET_LISTING, UPDATE_NICKNAME, CLEAR_SPORTS_RELATED_STORES} from '../../../../constants/ActionTypes';

const initialState = {
  bio: null,
  description: null,
  headline: null
};

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
    case CLEAR_SPORTS_RELATED_STORES: {
      return initialState;
    }
    default:
      return state;
  }
}
