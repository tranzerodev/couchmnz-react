import {UPDATE_MESSAGE_ATTACHMENT, FULFILLED, PROGRESS, REJECTED} from '../../constants/ActionTypes';

const initialState = {
  status: null,
  data: {
    id: null,
    name: null,
    size: null,
    url: null,
    uploadPercentage: 0
  }
};

export default function attachment(state = initialState, action) {
  switch (action.type) {
    case UPDATE_MESSAGE_ATTACHMENT + PROGRESS: {
      return {status: PROGRESS, data: {uploadPercentage: action.percentage, requestId: action.requestId, attachmentFileName: action.attachmentFileName}};
    }
    case UPDATE_MESSAGE_ATTACHMENT + FULFILLED: {
      return {status: FULFILLED, data: {uploadPercentage: 100, ...action.data}};
    }
    case UPDATE_MESSAGE_ATTACHMENT + REJECTED:
      return {status: REJECTED, data: {uploadPercentage: 0}}
      ;
    default:
      return state;
  }
}
