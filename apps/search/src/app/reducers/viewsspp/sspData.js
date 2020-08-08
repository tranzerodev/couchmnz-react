import {FETCH_SSP_PROFILEDATA, FULFILLED, PENDING, REJECTED} from '../../constants/ActionTypes';

const initialState = {data: {},
  status: null};

const notNull = value => ((value !== undefined) && (value !== null) && (value !== ''));

export default function Data(state = initialState, action) {
  switch (action.type) {
    case FETCH_SSP_PROFILEDATA + FULFILLED: {
      const {data} = action.payload;
      const newState = Object.assign({}, {data, status: notNull(data.responseCode) && (data.responseCode > 0) ? REJECTED : FULFILLED});

      return (newState);
    }
    case FETCH_SSP_PROFILEDATA + PENDING: {
      const newState = Object.assign({}, {status: PENDING});
      return (newState);
    }
    case FETCH_SSP_PROFILEDATA + REJECTED: {
      const newState = Object.assign({}, {status: REJECTED});
      return (newState);
    }
    default:
      return state;
  }
}
