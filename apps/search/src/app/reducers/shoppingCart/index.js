import {combineReducers} from 'redux';
import cartData from './cartData';
import taxSummary from './taxSummary';

const shoppingCart = combineReducers({
  cartData,
  taxSummary
});

export default shoppingCart;
