import {SET_RATING, PENDING, FULFILLED} from '../constants/ActionTypes';
const initialState = {data: [0, 0, 0, 0, 0], status: PENDING};
const rating = (state = initialState, action) => {
  switch (action.type) {
    case SET_RATING : {
      const averageRating = action.averageRating;
      let i = 0;
      const temp = initialState.data;
      for (; i < parseInt(averageRating, 10); i++) {
        temp[i] = 1;
      }
      temp[i] = averageRating % 1;
      return {data: temp, status: FULFILLED};
    }
    default:
      return state;
  }
};

export default rating;

