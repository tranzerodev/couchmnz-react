import {SAVE_MESSAGE_DRAFTS, CLEAR_DRAFT_MESSAGES, FETCH_DRAFT_MESSAGES, FULFILLED, PENDING, REJECTED, CLEAR_DRAFT_MESSAGE_STATUS} from '../../constants/ActionTypes';

const initialState = {
  data: [],
  lastMessageStatus: null
};

export default function drafts(state = initialState, action) {
  switch (action.type) {
    case SAVE_MESSAGE_DRAFTS + PENDING: {
      console.log('Saving message to drafts pending');
      const newState = Object.assign({}, state, {lastMessageStatus: PENDING});
      return newState;
    }
    case SAVE_MESSAGE_DRAFTS + FULFILLED: {
      const newState = Object.assign({}, state, {lastMessageStatus: FULFILLED});
      return newState;
    }
    case SAVE_MESSAGE_DRAFTS + REJECTED: {
      console.log('Message sending failed');
      const newState = Object.assign({}, state, {lastMessageStatus: REJECTED});
      return newState;
    }
    case FETCH_DRAFT_MESSAGES + PENDING: {
      console.log('Fetching draft messages');
      return state;
    }
    case FETCH_DRAFT_MESSAGES + FULFILLED: {
      console.log('Fetched draft messages');
      const {messages} = action.payload.data.payload;
      const newState = Object.assign({}, state, {data: messages});
      return newState;
    }
    case FETCH_DRAFT_MESSAGES + REJECTED: {
      console.error('fetching draft messages failed');
      return state;
    }
    case CLEAR_DRAFT_MESSAGE_STATUS: {
      console.log('Clearing Draft message status');
      const newState = Object.assign({}, state, {lastMessageStatus: null});
      return newState;
    }
    case CLEAR_DRAFT_MESSAGES: {
      console.log('Clearing draft messages');
      return initialState;
    }
    default:
      return state;
  }
}
