import {combineReducers} from 'redux';
import cartData from './cartData';
import taxSummary from './taxSummary';
import billingAddress from './billingAddress';
import shippingAddress from './shippingAddress';
import transactionSummary from './transactionSummary';
import order from './order';

const shoppingCart = combineReducers({
  billingAddress,
  shippingAddress,
  transactionSummary,
  cartData,
  taxSummary,
  order
});

export default shoppingCart;
