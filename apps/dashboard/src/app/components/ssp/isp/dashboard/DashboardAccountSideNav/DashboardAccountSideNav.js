import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import {
  DASHBOARD_ACCOUNT_BUSINESS_MODEL, DASHBOARD_ACCOUNT_BOOKING_PREFERENCE, 
  DASHBOARD_ACCOUNT_DETAILS, DASHBOARD_ACCOUNT_PAYOUT_DETAILS, 
  DASHBOARD_ACCOUNT_REGISTRATION_14_PAYPAL,DASHBOARD_ACCOUNT_PAYOUT_HISTORY, 
  DASHBOARD_ACCOUNT_REGISTRATION_14_BANK_PAYOUT, DASHBOARD_ACCOUNT_WALLET,
  ACCOUNTS_PATH
} from '../../../../../constants/pathConstants';

class DashboardAccountSideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="uk-width-xlarge-2-10 uk-width-large-3-10 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="leftPanel">
          <div className="profileMenu">
            <ul>
              <li>
                <a href={ACCOUNTS_PATH('businessModel')}>{this.props.p.t('DashboardAccountSideNav.business_model')}</a>
              </li>
              <li>
                <a href={ACCOUNTS_PATH('bookingPreferences')}>{this.props.p.t('DashboardAccountSideNav.booking_preferences')}</a>
              </li>
              <li>
                <a href={ACCOUNTS_PATH('accountDetails')}>{this.props.p.t('DashboardAccountSideNav.account_details')}</a>
              </li>
              {/* <li >
                <NavLink to={DASHBOARD_ACCOUNT_PAYOUT_HISTORY}>{this.props.p.t('DashboardAccountSideNav.payout_history')}</NavLink>
              </li> */}
              <li >
                <NavLink to={DASHBOARD_ACCOUNT_PAYOUT_DETAILS}>{this.props.p.t('DashboardAccountSideNav.payout_details')}</NavLink>
              </li>
              <li >
                <a href={ACCOUNTS_PATH('accountBalance')}>{this.props.p.t('DashboardAccountSideNav.wallet')}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
    };
  }
}
export default withRouter(translate(DashboardAccountSideNav));
