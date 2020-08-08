import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';
import PropTypes from 'prop-types';
import pathToRegExp from 'path-to-regexp';
import {connect} from 'react-redux';

import {
  DASHBOARD_ATHLETE_SCHEDULE, DASHBOARD_ATHLETE_PROFILE, DASHBOARD_ATHLETE_ACCOUNT, DASHBOARD,
  BOOKINGS_PATH, CALENDAR_PATH, DASHBOARD_PATH, MESSAGES_PATH
} from '../../../../constants/pathConstants';
import {
  MESSAGES_ROUTER_PATH
} from '../../../../constants/RouterPaths';

class AthleteDashboardNavBar extends React.Component {
  constructor() {
    super();
    this.getAthleteSchedulePath = this.getAthleteSchedulePath.bind(this);
  }

  getAthleteSchedulePath() {
    const {selectedProfile} = this.props;
    if (selectedProfile) {
      const toPath = pathToRegExp.compile(DASHBOARD_ATHLETE_SCHEDULE);
      return toPath({profileType: selectedProfile.type});
    }
    return DASHBOARD;
  }

  render() {
    const athleteSchedulePath = this.getAthleteSchedulePath();
    return (
      <section className="subHeaderSection header">
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
                  <NavLink to={athleteSchedulePath}>{this.props.p.t('AthleteDashboardNavBar.schedule')}</NavLink>
                </li> 
                <li>
                  <NavLink to={MESSAGES_ROUTER_PATH}>{this.props.p.t('DashboardNav.messages')}</NavLink>
                </li>*/}
                <li>
                  <NavLink to={DASHBOARD_ATHLETE_PROFILE}>{this.props.p.t('AthleteDashboardNavBar.profile')}</NavLink>
                </li>
                <li>
                  <NavLink to={DASHBOARD_ATHLETE_ACCOUNT}>{this.props.p.t('AthleteDashboardNavBar.account')}</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

AthleteDashboardNavBar.propTypes = {
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

export default connect(mapStateToProps)(withRouter(translate(AthleteDashboardNavBar)));
