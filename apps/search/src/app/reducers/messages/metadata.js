import {FULFILLED, PENDING, REJECTED, FETCH_MESSAGES_METADATA} from '../../constants/ActionTypes';
const initialState = {
  starred: 0,
  unread: 0,
  sent: 0,
  drafts: 0,
  archived: 0,
  trash: 0,
  status: null,
  prevMetadata: {
    starred: 0,
    unread: 0,
    sent: 0,
    drafts: 0,
    archived: 0,
    trash: 0
  }
};
const metadata = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MESSAGES_METADATA + PENDING: {
      console.log('Fetching message metadata');
      const newState = Object.assign({}, state, {status: PENDING});
      return newState;
    }
    case FETCH_MESSAGES_METADATA + FULFILLED: {
      console.log('Fetched message metadata');
      const {metadata} = action.payload.data.payload;
      const {starred, unread, sent, drafts, archived, trash} = state;
      const prevMetadata = {
        starred,
        unread,
        sent,
        drafts,
        archived,
        trash
      };
      const newState = Object.assign({}, metadata, {prevMetadata, status: FULFILLED});
      return newState;
    }
    case FETCH_MESSAGES_METADATA + REJECTED: {
      console.error('fetching message metadata failed');
      const newState = Object.assign({}, state, {status: REJECTED});
      return newState;
    }
    default:
      return state;
  }
};

export default metadata;

