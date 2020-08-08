import {SET_DISPLAY_PICTURE} from '../../../../constants/ActionTypes';

const initialState = {
  picture: null
};

const displayPicture = (state = initialState, action) => {
  switch (action.type) {
    case SET_DISPLAY_PICTURE: {
      const displayPicture = {picture: action.data};
      return Object.assign({}, displayPicture);
    }
    default:
      return state;
  }
};

export default displayPicture;
