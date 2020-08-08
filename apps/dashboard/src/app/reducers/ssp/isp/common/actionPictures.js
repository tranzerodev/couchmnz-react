import {
  SET_ACTION_PICTURES, UPDATE_ACTION_PICTURE
} from '../../../../constants/ActionTypes';
const initialState = {
  images: [],
  baseUrl: null
};

const images = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTION_PICTURES: {
      return Object.assign({}, state, action.images);
    }
    case UPDATE_ACTION_PICTURE: {
      /* Console.log('state', state, 'action', action); */
      const {index, image} = action;
      const {caption} = image;
      const _state = Object.assign([], state);
      const currentImage = Object.assign({}, _state.images[index]);
      _state.images[index] = Object.assign({}, currentImage, {
        caption_en: caption
      });
      return Object.assign({}, _state);
    }
    default:
      return state;
  }
};

export default images;
