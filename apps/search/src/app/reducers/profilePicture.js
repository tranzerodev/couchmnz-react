import {ADD_PICTURE, UPDATE_PICTURE, CLEAR_PICTURE, REJECTED, FULFILLED} from '../constants/ActionTypes';

const initialState = {
  data: {},
  status: null
};

const profilePicture = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PICTURE + FULFILLED: {
      const data = action.payload.data.payload;
      let newStatus;
      if (action.payload.data.responseCode > 0) {
        newStatus = Object.assign({}, state, {data: {}, status: REJECTED});
      } else {
        newStatus = Object.assign({}, state, {data, status: FULFILLED});
      }
      return newStatus;
    }
    case UPDATE_PICTURE:
      return Object.assign({}, state, {
        picture: action.picture
      });

    case CLEAR_PICTURE:
      return Object.assign({}, state, initialState);
    case ADD_PICTURE + REJECTED: return Object.assign({}, state, {data: {}, status: REJECTED});
    default:
      return state;
  }
};

export default profilePicture;
