import {
  SET_ACTION_VIDEOS, UPDATE_VIDEO
} from '../constants/ActionTypes';
const initialState = {
  videos: [],
  baseUrl: null
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
    default:
      return state;
  }
};

export default videos;
