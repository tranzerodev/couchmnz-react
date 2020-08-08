import {UPDATE_FILTER_SORTBY, CLEAR_FILTER_SORTBY} from '../../constants/ActionTypes';

const initialState = {};

export default function sortBy(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FILTER_SORTBY: {
      action.sortBy.dataType = 'sort';
      return Object.assign({}, state, action.sortBy);
    }
    case CLEAR_FILTER_SORTBY:
      return initialState;
    default:
      return state;
  }
}
