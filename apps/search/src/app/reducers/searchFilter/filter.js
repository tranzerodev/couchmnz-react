import {UPDATE_FILTER, CLEAR_FILTER} from '../../constants/ActionTypes';

const initialState = {
  ages: []
};

export default function filter(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FILTER: {
      return Object.assign({}, state, action.filter);
    }
    case CLEAR_FILTER:
      return initialState;
    default:
      return state;
  }
}
