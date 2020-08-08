import React, {Component} from 'react';
import {Redirect, Switch, withRouter, Route} from 'react-router-dom';

import AccountDetails from './Details';
import OrderHistory from './OrderHistory';
import Wallet from './Wallet';
import {
  DASHBOARD_ATHLETE_ACCOUNT_PROFILE,
  DASHBOARD_ATHLETE_ACCOUNT_ORDER_HISTORY,
  DASHBOARD_ATHLETE_ACCOUNT_WALLET,
  DASHBOARD_ATHLETE_ACCOUNT_PAYMENT_PREFERENCES
} from '../../../../constants/pathConstants';
import PaymentPreferences from './PaymentPreferences';

class AthleteAccountIndex extends Component {
  render() {
    return (
      <Switch>
        <Route path={DASHBOARD_ATHLETE_ACCOUNT_PROFILE} component={AccountDetails}/>
        <Route path={DASHBOARD_ATHLETE_ACCOUNT_ORDER_HISTORY} component={OrderHistory}/>
        <Route path={DASHBOARD_ATHLETE_ACCOUNT_PAYMENT_PREFERENCES} component={PaymentPreferences}/>
        <Route path={DASHBOARD_ATHLETE_ACCOUNT_WALLET} component={Wallet}/>
        <Redirect from="/" to={DASHBOARD_ATHLETE_ACCOUNT_PROFILE}/>
      </Switch>
    );
  }
}

export default (withRouter(AthleteAccountIndex));
