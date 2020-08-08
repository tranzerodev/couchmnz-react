import React, {Component} from 'react';
import {Redirect, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import DashboardAccountSideNav from '../DashboardAccountSideNav';
import BusinessModel from './DashboardBusinessModel';
import BookingPreferences from './DashboardBookingPreferences';
import AccountDetails from './DashboardAccountDetails';
import PayoutDetails from './DashboardPayoutDetails';
import BankPayoutDetails from './DashboardBankPayoutDetails';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {sspPaypalDetailsSubmit} from '../../../../../actions';
import PayoutHistory from './DashboardPayoutHistory';
import OrderDetails from './OrderDetails';

import PayoutWithdraw from './PayoutWithdraw';
import {DASHBOARD_ACCOUNT_BUSINESS_MODEL, DASHBOARD_ACCOUNT_BOOKING_PREFERENCE, DASHBOARD_ACCOUNT_DETAILS, DASHBOARD_ACCOUNT_PAYOUT_DETAILS, DASHBOARD_ACCOUNT_REGISTRATION_14_PAYPAL, DASHBOARD_ACCOUNT_REGISTRATION_14_BANK_PAYOUT, DASHBOARD_ACCOUNT_SCHEDULER_SETTINGS, DASHBOARD_ACCOUNT_WALLET, DASHBOARD_ACCOUNT_PAYOUT_HISTORY, DASHBOARD_ACCOUNT_EARNING_DETAILS, DASHBOARD_ACCOUNT_PAYOUT_WITHDRAW} from '../../../../../constants/pathConstants';
import DashboardPaypalSettings from './DashboardPaypalSettings';
import appConstants from '../../../../../constants/appConstants';
import AccountStatusNavBar from './AccountStatusNavBar';
import SchedulerSettings from '../SchedulerSettings';
import Wallet from '../../../../common/Wallet/WalletSummary';

class DashboardAccount extends Component {
  render() {
    const {profileActivationStatus} = this.props;
    return (
      <div className="dashboardSection">
        <div className="uk-grid">
          {profileActivationStatus === true ? <DashboardAccountSideNav/> : <AccountStatusNavBar/>}
          <Switch>
            <Route exact path={DASHBOARD_ACCOUNT_BUSINESS_MODEL} component={BusinessModel}/>
            <Route exact path={DASHBOARD_ACCOUNT_BOOKING_PREFERENCE} component={BookingPreferences}/>
            <Route exact path={DASHBOARD_ACCOUNT_DETAILS} component={AccountDetails}/>
            <Route exact path={DASHBOARD_ACCOUNT_PAYOUT_DETAILS} component={PayoutDetails}/>
            <Route exact path={DASHBOARD_ACCOUNT_EARNING_DETAILS} component={OrderDetails}/>
            {/* <Route exact path={DASHBOARD_ACCOUNT_PAYOUT_WITHDRAW} component={PayoutWithdraw}/> */}
            {/* <Route path={DASHBOARD_ACCOUNT_PAYOUT_HISTORY} component={PayoutHistory}/> */}
            <Route exact path={DASHBOARD_ACCOUNT_REGISTRATION_14_PAYPAL} component={DashboardPaypalSettings}/>
            <Route exact path={DASHBOARD_ACCOUNT_REGISTRATION_14_BANK_PAYOUT} component={BankPayoutDetails}/>
            <Route exact path={DASHBOARD_ACCOUNT_SCHEDULER_SETTINGS} component={SchedulerSettings}/>
            <Route exact path={DASHBOARD_ACCOUNT_WALLET} component={Wallet}/>
            <Redirect from="/" to={DASHBOARD_ACCOUNT_BUSINESS_MODEL}/>
          </Switch>
        </div>
      </div>

    );
  }
  static get propTypes() {
    return {
      profileActivationStatus: PropTypes.bool.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {payoutOption, userProfiles} = state;
  return {
    payoutOption,
    profileActivationStatus: userProfiles.selectedProfile.isActive === appConstants.profileActiveFlages.active
  };
};
const mapDispatchToProps = dispatch => {
  return {
    sspPaypalDetailsSubmit: data => dispatch(sspPaypalDetailsSubmit(data))
  };
};
const AccountPage = translate(connect(mapStateToProps, mapDispatchToProps)(DashboardAccount));
export default AccountPage;
