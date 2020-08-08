import {UPDATE_SEARCH_KEY, CLEAR_SEARCH_KEY} from '../../constants/ActionTypes';

const initialState = {};

export default function searchKey(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SEARCH_KEY: {
      action.searchKey.dataType = 'searchKey';
      return Object.assign({}, state, action.searchKey);
    }
    case CLEAR_SEARCH_KEY:
      return initialState;
    default:
      return state;
  }
}
