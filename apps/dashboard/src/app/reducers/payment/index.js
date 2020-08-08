import {combineReducers} from 'redux';
import paymentDetails from './paymentDetails';
import charge from './charge';

const payment = combineReducers({
  paymentDetails,
  charge
});

export default payment;
