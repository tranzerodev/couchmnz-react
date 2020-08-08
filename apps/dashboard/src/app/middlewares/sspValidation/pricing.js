import {
  sspValidatePricing,
  sspValidateMultiplePricing
} from '../../actions';
import {UPDATE_PRICE, SSP_PRICING_SUBMIT} from '../../constants/ActionTypes';

const handlePriceSearch = (prices, id) => prices.findIndex(price => price.id === id);

const updateProfileData = store => next => action => {
  next(action);
  switch (action.type) {
    case SSP_PRICING_SUBMIT: {
      console.log('pricingMiddlewareAction', action);
      const {prices} = store.getState();
      const price = prices[handlePriceSearch(prices, action.data.type.id)];
      switch (action.data.type.name) {
        case 'Private Training': {
          store.dispatch(sspValidatePricing(price));
          break;
        }
        case 'Groups':
        case 'Teams':
        case 'Clinics': {
          store.dispatch(sspValidateMultiplePricing(price));
          break;
        }
        default: store.dispatch(sspValidatePricing(price));
      }
      break;
    }
    default: break;
  }
};

export default updateProfileData;
