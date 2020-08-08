import {SSP_VALIDATE_PHOTOS_AND_VIDEOS, SSP_PHOTOS_AND_VIDEOS_SUBMIT} from '../../../../constants/ActionTypes';

function notNull(object) {
  if (object === undefined || object === null || object === '') {
    return false;
  }
  return true;
}

const initialState = {
  submitted: false,
  valid: false,
  profilePicture: false,
  actionPhotos: false
};
const media = (state = initialState, action) => {
  switch (action.type) {
    case SSP_VALIDATE_PHOTOS_AND_VIDEOS : {
      const data = action.data;
      const validation = Object.assign({}, state);
      validation.profilePicture = notNull(data.displayPicture);
      validation.actionPhotos = Boolean(data.actionPictures && data.actionPictures.images && data.actionPictures.images.length);
      if (validation.profilePicture === true && validation.actionPhotos === true) {
        validation.valid = true;
      } else {
        validation.valid = false;
      }
      return validation;
    }
    case SSP_PHOTOS_AND_VIDEOS_SUBMIT : {
      const validation = Object.assign({}, state);
      validation.submitted = action.data.status;
      return validation;
    }
    default:
      return state;
  }
};

export default media;

