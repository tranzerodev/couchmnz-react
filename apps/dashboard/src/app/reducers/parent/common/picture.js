import {SET_CHILD_PICTURE} from '../../../constants/ActionTypes';

const initialState = {
  url: null
};

const picture = (state = initialState, action) => {
  const {type} = action;
  switch (type) {
    case SET_CHILD_PICTURE: {
      const {payload} = action;
      return Object.assign({}, state, {url: payload});
      // Return Object.assign({}, state, {url: 'https://cdnjs.cloudflare.com/ajax/libs/admin-lte/2.4.2/img/avatar5.png'});
    }
    default:
      return state;
  }
};

export default picture;
