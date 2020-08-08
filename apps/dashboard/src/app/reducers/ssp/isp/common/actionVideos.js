import {
  SET_ACTION_VIDEOS, UPDATE_VIDEO, PENDING, FULFILLED, REJECTED, UPLOAD_ACTION_VIDEOS
} from '../../../../constants/ActionTypes';
const initialState = {
  videos: [],
  baseUrl: null,
  status: null
};
const videos = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTION_VIDEOS:
      return Object.assign({}, state, action.videos);
    case UPDATE_VIDEO: {
      /* Console.log('state', state, 'action', action); */
      const {index, video} = action;
      const {caption} = video;
      const _state = Object.assign({}, state);
      const currentVideo = Object.assign({}, _state.videos[index]);
      _state.videos[index] = Object.assign({}, currentVideo, {
        caption_en: caption
      });
      return Object.assign({}, _state);
    }
    case UPLOAD_ACTION_VIDEOS + PENDING: {
      return Object.assign({}, state, {status: PENDING});
    }
    case UPLOAD_ACTION_VIDEOS + FULFILLED: {
      return Object.assign({}, state, {status: action.payload.data.responseCode === 0 ? FULFILLED : REJECTED});
    }
    default:
      return state;
  }
};

export default videos;
