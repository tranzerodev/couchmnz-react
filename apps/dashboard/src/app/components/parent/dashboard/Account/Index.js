import React, {Component} from 'react';
import {Redirect, Switch, withRouter, Route} from 'react-router-dom';

import AccountDetails from './Details';
import OrderHistory from './OrderHistory';
import Wallet from './Wallet';
import {
  PARENT_ACCOUNT_DETAILS, 
  DASHBOARD_PARENT_ACCOUNT_ORDER_HISTORY, 
  DASHBOARD_PARENT_ACCOUNT_WALLET, 
  DASHBOARD_PARENT_ACCOUNT_PAYMENT_PREFERENCES
} from '../../../../constants/pathConstants';
import PaymentPreferences from './PaymentPreferences';

class ParentAccountIndex extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path={PARENT_ACCOUNT_DETAILS} component={AccountDetails}/>
          <Route path={DASHBOARD_PARENT_ACCOUNT_ORDER_HISTORY} component={OrderHistory}/>
          <Route path={DASHBOARD_PARENT_ACCOUNT_WALLET} component={Wallet}/>
          <Route path={DASHBOARD_PARENT_ACCOUNT_PAYMENT_PREFERENCES} component={PaymentPreferences}/>
          <Redirect from="/" to={PARENT_ACCOUNT_DETAILS}/>
        </Switch>
      </div>
    );
  }
}

export default (withRouter(ParentAccountIndex));
