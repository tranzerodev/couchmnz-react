
import {FETCH_ISP_TRAINED_ATHLETES, REJECTED, PENDING, FULFILLED} from '../../../../constants/ActionTypes';

const initialState = {data: []};

export default function trainedAthletes(state = initialState, action) {
  switch (action.type) {
    case FETCH_ISP_TRAINED_ATHLETES + FULFILLED: {
      if (action.payload.data.responseCode === 0) {
        const data = action.payload.data.payload;
        return Object.assign({}, state, {data, status: FULFILLED});
      }

      return Object.assign({}, state, {data: initialState, status: REJECTED});
    }
    case FETCH_ISP_TRAINED_ATHLETES + PENDING : return {data: [], status: PENDING};
    case FETCH_ISP_TRAINED_ATHLETES + REJECTED : return {data: [], status: REJECTED};

    default:
      return state;
  }
}
