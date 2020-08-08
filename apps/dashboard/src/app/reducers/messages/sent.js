import {SEND_MESSAGE, FULFILLED, PENDING, REJECTED, CLEAR_SENT_MESSAGE_STATUS} from '../../constants/ActionTypes';

const initialState = {
  lastMessageStatus: null
};

export default function sent(state = initialState, action) {
  switch (action.type) {
    case SEND_MESSAGE + PENDING: {
      console.log('Sending message pending');
      const newState = Object.assign({}, state, {lastMessageStatus: PENDING});
      return newState;
    }
    case SEND_MESSAGE + FULFILLED: {
      console.log('Message sent');
      const newState = Object.assign({}, state, {lastMessageStatus: FULFILLED});
      return newState;
    }
    case SEND_MESSAGE + REJECTED: {
      console.log('Message sending failed');
      const newState = Object.assign({}, state, {lastMessageStatus: REJECTED});
      return newState;
    }
    case CLEAR_SENT_MESSAGE_STATUS: {
      console.log('Clearing sent message status');
      const newState = Object.assign({}, state, {lastMessageStatus: null});
      return newState;
    }
    default:
      return state;
  }
}
