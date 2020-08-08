import {UPDATE_FILTER_PRICE, CLEAR_FILTER_PRICE} from '../../constants/ActionTypes';

const initialState = {};

export default function price(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FILTER_PRICE: {
      action.price.dataType = 'priceRange';
      return Object.assign({}, state, action.price);
    }
    case CLEAR_FILTER_PRICE:
      return initialState;
    default:
      return state;
  }
}
