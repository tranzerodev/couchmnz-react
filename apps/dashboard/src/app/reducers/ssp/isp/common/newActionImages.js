import {
  SET_IMAGES,
  ADD_IMAGES,
  REMOVE_IMAGE,
  UPDATE_IMAGE,
  CLEAR_IMAGES
} from '../../../../constants/ActionTypes';

const images = (state = [], action) => {
  switch (action.type) {
    case SET_IMAGES:
      return Object.assign([], state, action.images);
    case ADD_IMAGES:
      return state.concat(images);
    case REMOVE_IMAGE:
      return state.filter((image, index) => action.index !== index);
    case UPDATE_IMAGE: {
      /* Console.log('state', state, 'action', action); */
      const {index, image} = action;
      const {caption} = image;
      const _state = Object.assign([], state);
      const currentImage = Object.assign({}, _state[index]);
      _state[index] = Object.assign({}, currentImage, {
        caption
      });
      return Object.assign([], _state);
    }
    case CLEAR_IMAGES:
      return [];
    default:
      return state;
  }
};

export default images;
