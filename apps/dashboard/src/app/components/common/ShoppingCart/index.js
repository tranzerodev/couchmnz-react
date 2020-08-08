import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import {SHOPPING_CART, SHOPPING_CART_EDIT, SHOPPING_CART_VIEW, SHOPPING_CART_PAYMENT, SHOPPING_CART_ADDRESS, SHOPPING_CART_INVITE, PAYMENT_REDIRECT_ROUTE, SHOPPING_CART_ORDER_CONFIRMATION} from '../../../constants/pathConstants';
import ShoppingCartEdit from './Edit';
import ShoppingCartView from './View';
import ShoppingCartPayment from './PaymentMode';
import ShoppingCartAddress from './Address';
import ShoppingCartInvite from './Invite';
import PaymentProcessing from './PaymentProcessing';
import OrderConfirmation from './OrderConfirmation';

class ShoppingCartIndex extends Component {
  render() {
    return (
      <Switch>
        <Route path={SHOPPING_CART_EDIT} component={ShoppingCartEdit}/>
        <Route path={SHOPPING_CART_VIEW} component={ShoppingCartView}/>
        <Route path={SHOPPING_CART_PAYMENT} component={ShoppingCartPayment}/>
        <Route path={SHOPPING_CART_ADDRESS} component={ShoppingCartAddress}/>
        <Route path={SHOPPING_CART_INVITE} component={ShoppingCartInvite}/>
        <Route path={PAYMENT_REDIRECT_ROUTE} component={PaymentProcessing}/>
        <Route path={SHOPPING_CART_ORDER_CONFIRMATION} component={OrderConfirmation}/>
        <Redirect exact from={SHOPPING_CART} to={SHOPPING_CART_EDIT}/>
      </Switch>
    );
  }
}

export default ShoppingCartIndex;
