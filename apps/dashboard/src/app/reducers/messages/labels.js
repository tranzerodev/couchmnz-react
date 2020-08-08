import {CLEAR_MESSAGE_LABELS, FULFILLED, FETCH_MESSAGE_LABEL} from '../../constants/ActionTypes';

const initialState = [];

export default function labels(state = initialState, action) {
  switch (action.type) {
    case FETCH_MESSAGE_LABEL + FULFILLED: {
      console.log('Message label fetched');
      const {labels} = action.payload.data.payload;
      return labels;
    }
    case CLEAR_MESSAGE_LABELS:
      return initialState;
    default:
      return state;
  }
}
