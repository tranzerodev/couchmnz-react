import {
  SET_VIDEOS,
  REMOVE_VIDEO,
  ADD_VIDEOS,
  CLEAR_VIDEOS
} from '../../../../constants/ActionTypes';

const videos = (state = [], action) => {
  switch (action.type) {
    case SET_VIDEOS:
      return Object.assign([], state, action.videos);
    case ADD_VIDEOS:
      return state.concat(videos);
    case REMOVE_VIDEO:
      return state.filter((video, index) => action.index !== index);
    case CLEAR_VIDEOS:
      return Object.assign([], state, []);
    default:
      return state;
  }
};

export default videos;
