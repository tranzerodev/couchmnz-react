import appConstants from '../../constants/appConstants';
const {shoppingCart} = appConstants;
const {errorCodesForPaymentConfirmation} = shoppingCart;

export const isConfirmationError = responseCode => {
  const index = errorCodesForPaymentConfirmation.indexOf(responseCode);
  if (index > -1) {
    return true;
  }
  return false;
};
