import {FULFILLED, REJECTED, PENDING, FETCH_SPORTS_AWARDS_LIST, CLEAR_SPORTS_AWARDS_LIST} from '../constants/ActionTypes';

const initialState = {data: [], status: null};

export default function sportsAwardsList(state = initialState, action) {
  switch (action.type) {
    case FETCH_SPORTS_AWARDS_LIST + FULFILLED: {
      if (action.payload.data.responseCode === 0) {
        const filter = action.payload.data.payload;
        return Object.assign({}, state, {data: filter, status: FULFILLED});
      }
      return Object.assign({}, state, {data: [], status: REJECTED});
    }
    case FETCH_SPORTS_AWARDS_LIST + PENDING: {
      return {data: [], status: PENDING};
    }
    case FETCH_SPORTS_AWARDS_LIST + REJECTED: {
      return {data: [], status: REJECTED};
    }
    case CLEAR_SPORTS_AWARDS_LIST:
      return initialState;
    default:
      return state;
  }
}

// Import {CLEAR_SPORTS_AWARDS_LIST, FULFILLED, SET_SPORTS_AWARDS_LIST} from '../constants/ActionTypes';

// const initialState = {data: [], status: null};

// export default function certificationsList(state = initialState, action) {
//   switch (action.type) {
//     case SET_SPORTS_AWARDS_LIST: {
//       const {data} = action;
//       return {data, status: FULFILLED};
//     }
//     case CLEAR_SPORTS_AWARDS_LIST:
//       return initialState;
//     default:
//       return state;
//   }
// }
