import {SET_ATHLETE_PICTURE} from '../../../constants/ActionTypes';

const initialState = {
  url: null
};

const picture = (state = initialState, action) => {
  const {type} = action;
  switch (type) {
    case SET_ATHLETE_PICTURE: {
      const {payload} = action;
      return Object.assign({}, state, {url: payload});
      // Return Object.assign({}, state, {url: 'https://adminlte.io/themes/AdminLTE/dist/img/user6-128x128.jpg'});
    }
    default:
      return state;
  }
};

export default picture;
