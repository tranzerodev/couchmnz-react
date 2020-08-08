import {UPDATE_GENDER, CLEAR_GENDER, SET_GENDER, SAVE_TRINING_PREFERENCES, CLEAR_SPORTS_RELATED_STORES} from '../../../../constants/ActionTypes';

const initialState = [];

const isExistingItem = (array, elem) => {
  const index = array.findIndex(el => el === elem);
  return index >= 0;
};

export default function gender(state = initialState, action) {
  switch (action.type) {
    case UPDATE_GENDER: {
      const _state = Object.assign([], state);
      const {gender} = action;
      return Object.assign([], isExistingItem(state, gender) ? _state.filter(g => g !== gender) : _state.concat(gender));
    }
    case SET_GENDER : {
      const {genders} = action;
      return genders;
    }
    case CLEAR_GENDER:
      return undefined;
    case SAVE_TRINING_PREFERENCES: {
      const {genders} = action;
      return Object.assign([], genders);
    }
    case CLEAR_SPORTS_RELATED_STORES: {
      return initialState;
    }
    default:
      return state;
  }
}
