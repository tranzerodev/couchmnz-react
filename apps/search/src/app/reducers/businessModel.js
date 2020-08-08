import {UPDATE_BUSINESS_MODEL, CLEAR_BUSINESS_MODEL, SET_BUSINESS_MODEL} from '../constants/ActionTypes';

const initialState = '';

export default function businessModel(state = initialState, action) {
  switch (action.type) {
    case UPDATE_BUSINESS_MODEL: {
      const {profile} = action;
      return profile;
    }
    case CLEAR_BUSINESS_MODEL: {
      return initialState;
    }
    case SET_BUSINESS_MODEL: {
      const {data} = action;
      return data;
    }
    default:
      return state;
  }
}
