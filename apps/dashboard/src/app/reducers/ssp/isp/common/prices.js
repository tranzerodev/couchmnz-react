import {UPDATE_PRICE, CLEAR_PRICES, SET_PRICING, SAVE_PRICE, CLEAR_SPORTS_RELATED_STORES} from '../../../../constants/ActionTypes';

const initialState = [];
const handleSearchPricing = (pricing, id, name) => pricing.findIndex(price => price.id === id && price.name === name);

export default function listing(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PRICE: {
      const {profile} = action;
      return Object.assign({}, state, profile);
    }
    case CLEAR_PRICES: {
      return initialState;
    }
    case SET_PRICING: {
      const {pricing} = action;
      return Object.assign([], pricing);
    }
    case SAVE_PRICE: {
      const {price} = action;
      const index = handleSearchPricing(state, price.id, price.name);
      if (index >= 0) {
        const prices = Object.assign([], state);
        prices[index] = price;
        return prices;
      }
      return [price];
    }
    case CLEAR_SPORTS_RELATED_STORES: {
      return initialState;
    }
    default:
      return state;
  }
}
