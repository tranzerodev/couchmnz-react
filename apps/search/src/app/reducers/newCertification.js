import {UPDATE_NEW_CERTIFICATION, CLEAR_NEW_CERTIFICATION} from '../constants/ActionTypes';

const initialState = {
  id: '',
  name: '',
  certifierID: '',
  certifierName: '',
  year: ''
};

export default function certification(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NEW_CERTIFICATION: {
      const {updatedData} = action;
      return Object.assign({}, state, updatedData);
    }
    case CLEAR_NEW_CERTIFICATION:
      return initialState;
    default:
      return state;
  }
}
