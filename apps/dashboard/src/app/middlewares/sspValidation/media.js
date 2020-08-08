import {
  sspValidatePhotosAndVideos
} from '../../actions';
import {SET_ACTION_PICTURES, SET_DISPLAY_PICTURE, SET_ACTION_VIDEOS} from '../../constants/ActionTypes';

const updateProfileData = store => next => action => {
  next(action);
  switch (action.type) {
    case SET_ACTION_VIDEOS:
    case SET_DISPLAY_PICTURE:
    case SET_ACTION_PICTURES: {
      const {actionPictures, displayPicture} = store.getState();
      store.dispatch(sspValidatePhotosAndVideos({actionPictures, displayPicture}));
      break;
    }
    default:break;
  }
};

export default updateProfileData;
