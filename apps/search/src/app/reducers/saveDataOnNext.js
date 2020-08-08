import {CLEAR_SAVE_DATA_ON_NEXT, SAVE_DATA_ON_NEXT, PENDING, FULFILLED} from '../constants/ActionTypes';

const initialState = {
  updateType: null,
  status: null
};

export default function saveDataOnNext(state = initialState, action) {
  switch (action.type) {
    case SAVE_DATA_ON_NEXT + PENDING: {
      const {updateType} = action;
      return {status: PENDING, updateType};
    }
    case SAVE_DATA_ON_NEXT + FULFILLED: {
      const {updateType} = action;
      return {
        status: FULFILLED,
        updateType
      };
    }
    case CLEAR_SAVE_DATA_ON_NEXT:
      return initialState;
    default:
      return state;
  }
}
