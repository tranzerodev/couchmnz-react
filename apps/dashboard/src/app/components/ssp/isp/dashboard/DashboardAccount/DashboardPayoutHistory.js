import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {
  savePayoutOption
} from '../../../../../actions';
import NextLink from '../../../../common/RegistrationNextLink';
import appConstants from '../../../../../constants/appConstants';
import PayoutHistoryHeader from './PayoutHistoryHeader';
import {Route, Switch, NavLink, Redirect} from 'react-router-dom';

import {DASHBOARD_ACCOUNT_BUSINESS_MODEL, DASHBOARD_ACCOUNT_REGISTRATION_14_PAYPAL, DASHBOARD_ACCOUNT_REGISTRATION_14_BANK_PAYOUT, DASHBOARD_SCHEDULE_SESSION, DASHBOARD_ACCOUNT_PAYOUT_HISTORY, DASHBOARD_ACCOUNT_PAYOUT_HISTORY_PAYOUTS, DASHBOARD_ACCOUNT_PAYOUT_HISTORY_EARNINGS} from '../../../../../constants/pathConstants';
import DashboardHistoryEarnings from './DashboardHistoryEarnings';
import DashboardHistoryPayouts from './DashboardHistoryPayouts';
class DashboardPayoutHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Switch>
        <Route path={DASHBOARD_ACCOUNT_PAYOUT_HISTORY_EARNINGS} component={DashboardHistoryEarnings}/>
        <Route path={DASHBOARD_ACCOUNT_PAYOUT_HISTORY_PAYOUTS} component={DashboardHistoryPayouts}/>
        <Redirect exact from={DASHBOARD_ACCOUNT_PAYOUT_HISTORY} to={DASHBOARD_ACCOUNT_PAYOUT_HISTORY_EARNINGS}/>
      </Switch>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired
    };
  }
}
DashboardPayoutHistory.defaultProps = {

};

export default translate(DashboardPayoutHistory);
