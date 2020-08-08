import {UPDATE_INSTAND_BOOK, CLEAR_INSTAND_BOOK} from '../../constants/ActionTypes';

const initialState = {};

export default function instantBook(state = initialState, action) {
  switch (action.type) {
    case UPDATE_INSTAND_BOOK: {
      action.instantBook.dataType = 'instantBook';
      return Object.assign({}, state, action.instantBook);
    }
    case CLEAR_INSTAND_BOOK:
      return initialState;
    default:
      return state;
  }
}
