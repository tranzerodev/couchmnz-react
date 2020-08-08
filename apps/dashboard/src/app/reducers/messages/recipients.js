import {FULFILLED, SEARCH_MESSAGE_RECIPIENTS} from '../../constants/ActionTypes';
const initalState = [];
const recipients = (state = initalState, action) => {
  switch (action.type) {
    case SEARCH_MESSAGE_RECIPIENTS + FULFILLED: {
      const {recipients} = action.payload.data.payload;
      return recipients;
    }
    default:
      return state;
  }
};

export default recipients;
