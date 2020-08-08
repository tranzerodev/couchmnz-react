import {UPDATE_SEARCH_FILTER, CLEAR_SEARCH_FILTER, POST_SEARCH_FILTER, FULFILLED, PENDING, REJECTED} from '../../constants/ActionTypes';

const initialState = {};

export default function queryBuilder(state = initialState, action) {
  switch (action.type) {
    case POST_SEARCH_FILTER: {
      // Action.payload.dataType = 'nested';
      return Object.assign({}, state, action.payload);
    }
   /*  case UPDATE_SEARCH_FILTER + FULFILLED: {
      const {data} = action.data;
      const newState = Object.assign({}, {data, status: FULFILLED});
      return (newState);
    }
    case UPDATE_SEARCH_FILTER + PENDING: {
      const status = PENDING;
      const newState = Object.assign({}, {status});
      return (newState);
    }
    case UPDATE_SEARCH_FILTER + REJECTED: {
      const status = REJECTED;
      const newState = Object.assign({}, {status});
      return (newState);
    } */
    case CLEAR_SEARCH_FILTER:
      return initialState;
    default:
      return state;
  }
}
