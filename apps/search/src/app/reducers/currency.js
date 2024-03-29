import {UPDATE_CURRENCY, CLEAR_CURRENCY, SET_CURRENCY} from '../constants/ActionTypes';

const initialState = '';

export default function currency(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CURRENCY: {
      const {profile} = action;
      return profile;
    }
    case CLEAR_CURRENCY: {
      return initialState;
    }
    case SET_CURRENCY: {
      const {data} = action;
      return data;
    }
    default:
      return state;
  }
}
