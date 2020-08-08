import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import {DASHBOARD_SESSION_SET_PRICING, DASHBOARD_SESSION_DEFINE_SESSION, DASHBOARD_SESSION_TRAINING_LOCATION} from '../../../../../constants/pathConstants';
import SportsSwitcher from '../SportsSwitcher';

class DashboardSessionSideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="leftPanel">
          <div className="profileMenu">
            <SportsSwitcher/>
            <ul>
              <li>
                <NavLink to={DASHBOARD_SESSION_TRAINING_LOCATION} activeClassName="active">{this.props.p.t('DashboardSessionSideNav.training_locations')}</NavLink>
              </li>
              <li>
                <NavLink to={DASHBOARD_SESSION_SET_PRICING} activeClassName="active">{this.props.p.t('DashboardSessionSideNav.set_pricing')}</NavLink>
              </li>
              <li>
                <NavLink to={DASHBOARD_SESSION_DEFINE_SESSION} activeClassName="active">{this.props.p.t('DashboardSessionSideNav.define_sessions')}</NavLink>
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
export default withRouter(translate(DashboardSessionSideNav));
