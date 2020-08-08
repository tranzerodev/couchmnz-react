import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Card from './Card';

import {SHOPPING_CART_PAYMENT_CARD} from '../../../../constants/pathConstants';

export default class PaymentModeSwitch extends Component {
  constructor(props) {
    super(props);
    this.renderCardComponent = this.renderCardComponent.bind(this);
  }

  renderCardComponent() {
    return (
      <Card
        {...this.props}
      />
    );
  }

  render() {
    return (
      <Switch>
        <Route key="card" name="Card" path={SHOPPING_CART_PAYMENT_CARD} component={this.renderCardComponent}/>
        <Redirect from="/" to={SHOPPING_CART_PAYMENT_CARD}/>
      </Switch>
    );
  }
}

