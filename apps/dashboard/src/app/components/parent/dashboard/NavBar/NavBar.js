import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';
import PropTypes from 'prop-types';
import pathToRegExp from 'path-to-regexp';
import {
  PARENT_ACCOUNT_DETAILS, PARENT_PROFILE_DETAILS, 
  DASHBOARD, DASHBOARD_ATHLETE_SCHEDULE,
  BOOKINGS_PATH, CALENDAR_PATH, DASHBOARD_PATH, MESSAGES_PATH
} from '../../../../constants/pathConstants';
import {connect} from 'react-redux';
import {
  MESSAGES_ROUTER_PATH
} from '../../../../constants/RouterPaths';
class ParentDashboardNavBar extends React.Component {
  constructor() {
    super();
    this.getParentSchedulePath = this.getParentSchedulePath.bind(this);
  }

  getParentSchedulePath() {
    const {selectedProfile} = this.props;
    if (selectedProfile) {
      const toPath = pathToRegExp.compile(DASHBOARD_ATHLETE_SCHEDULE);
      return toPath({profileType: selectedProfile.type});
    }
    return DASHBOARD;
  }
  render() {
    const parentSchedulePath = this.getParentSchedulePath();
    return (
      <section className="subHeaderSection">
        <div className="uk-container-fluid uk-container-center">
          <div className="uk-grid">
            <div className="uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
              <ul className="subHeaderMenu">
                <li>
                  <a href={DASHBOARD_PATH()}>{this.props.p.t('dashboard')}</a>
                </li>
                <li>
                  <a href={CALENDAR_PATH()}>{this.props.p.t('calendar')}</a>
                </li>
                <li>
                  <a href={BOOKINGS_PATH()}>{this.props.p.t('bookings')}</a>
                </li>
                <li>
                  <a href={MESSAGES_PATH()}>{this.props.p.t('messages')}</a>
                </li>
              
                {/* <li>
                  <NavLink to={parentSchedulePath}>{this.props.p.t('AthleteDashboardNavBar.schedule')}</NavLink>
                </li> 
                <li>
                  <NavLink to={MESSAGES_ROUTER_PATH}>{this.props.p.t('DashboardNav.messages')}</NavLink>
                </li> */}
                <li>
                  <NavLink to={PARENT_PROFILE_DETAILS}>{this.props.p.t('ParentDashboardNavBar.profile')}</NavLink>
                </li>
                <li>
                  <NavLink to={PARENT_ACCOUNT_DETAILS}>{this.props.p.t('ParentDashboardNavBar.account')}</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

ParentDashboardNavBar.propTypes = {
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  selectedProfile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const {userProfiles} = state;
  const {selectedProfile} = userProfiles;
  return {
    selectedProfile
  };
};

export default connect(mapStateToProps)(withRouter(translate(ParentDashboardNavBar)));
