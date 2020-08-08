import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import {
  PARENT_ACCOUNT_DETAILS,
  DASHBOARD_PARENT_ACCOUNT_WALLET,
  DASHBOARD_PARENT_ACCOUNT_PAYMENT_PREFERENCES,
  DASHBOARD_PARENT_ACCOUNT_ORDER_HISTORY
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
                <NavLink to={PARENT_ACCOUNT_DETAILS}>{this.props.p.t('ParentAccountSideNav.account_details')}</NavLink>
                <NavLink to={DASHBOARD_PARENT_ACCOUNT_PAYMENT_PREFERENCES}>{this.props.p.t('ParentAccountSideNav.paymentPreferences')}</NavLink>
                <NavLink to={DASHBOARD_PARENT_ACCOUNT_ORDER_HISTORY}>{this.props.p.t('ParentAccountSideNav.order_history')}</NavLink>
                <NavLink to={DASHBOARD_PARENT_ACCOUNT_WALLET}>{this.props.p.t('ParentAccountSideNav.wallet')}</NavLink>
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
