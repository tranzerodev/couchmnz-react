import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import {
  /* DASHBOARD_ATHLETE_ACCOUNT_ORDER_HISTORY, */
  DASHBOARD_ATHLETE_ACCOUNT_PROFILE,
  DASHBOARD_ATHLETE_ACCOUNT_WALLET,
  DASHBOARD_ATHLETE_ACCOUNT_PAYMENT_PREFERENCES,
  DASHBOARD_ATHLETE_ACCOUNT_ORDER_HISTORY,
  ACCOUNTS_PATH
} from '../../../../../constants/pathConstants';

class SideNav extends React.Component {
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
                <NavLink to={DASHBOARD_ATHLETE_ACCOUNT_PROFILE}>{this.props.p.t('AthleteAccountSideNav.account_details')}</NavLink>
                <NavLink to={DASHBOARD_ATHLETE_ACCOUNT_PAYMENT_PREFERENCES}>{this.props.p.t('AthleteAccountSideNav.paymentPreferences')}</NavLink>
                <a href={ACCOUNTS_PATH('accountBalance')}>{this.props.p.t('AthleteAccountSideNav.wallet')}</a>
                <NavLink to={DASHBOARD_ATHLETE_ACCOUNT_ORDER_HISTORY}>{this.props.p.t('AthleteAccountSideNav.order_history')}</NavLink>
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
export default withRouter(translate(SideNav));
