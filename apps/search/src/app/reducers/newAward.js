import {UPDATE_UNI_AWARD, CLEAR_UNI_AWARD} from '../constants/ActionTypes';

const initialState = {
  id: '',
  name: '',
  institutionID: '',
  institutionName: '',
  year: ''
};

export default function award(state = initialState, action) {
  switch (action.type) {
    case UPDATE_UNI_AWARD: {
      const {updatedData} = action;
      return Object.assign({}, state, updatedData);
    }
    case CLEAR_UNI_AWARD:
      return initialState;
    default:
      return state;
  }
}
