import {UPDATE_UNI_DEGREE, CLEAR_UNI_DEGREE} from '../constants/ActionTypes';

const initialState = {
  id: '',
  name: '',
  institutionID: '',
  institutionName: '',
  year: ''
};

export default function degree(state = initialState, action) {
  switch (action.type) {
    case UPDATE_UNI_DEGREE: {
      const {updatedData} = action;
      return Object.assign({}, state, updatedData);
    }
    case CLEAR_UNI_DEGREE:
      return initialState;
    default:
      return state;
  }
}
