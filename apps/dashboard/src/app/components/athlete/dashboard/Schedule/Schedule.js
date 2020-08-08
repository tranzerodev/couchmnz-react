import React, {Component} from 'react';
import {Redirect, Switch, withRouter, Route, Link} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import pathToRegExp from 'path-to-regexp';
import {connect} from 'react-redux';

import Tabs from './Tabs';
import Scheduled from './Scheduled';
import Unscheduled from './Unscheduled';
import {
  DASHBOARD_ATHLETE_SCHEDULER_SCHEDULED,
  DASHBOARD_ATHLETE_SCHEDULER_MANAGE_SESSION,
  DASHBOARD_ATHLETE_SCHEDULER_UNSCHEDULED,
  DASHBOARD_ATHLETE_SCHEDULER_HISTORY,
  DASHBOARD_ATHLETE_SCHEDULER_CHANGES,
  DASHBOARD
} from '../../../../constants/pathConstants';
import Changes from './Changes';

class AthleteSchedule extends Component {
  constructor() {
    super();
    this.getRedirectPath = this.getRedirectPath.bind(this);
  }

  getRedirectPath() {
    const {selectedProfile} = this.props;
    if (selectedProfile) {
      const toPath = pathToRegExp.compile(DASHBOARD_ATHLETE_SCHEDULER_SCHEDULED);
      return toPath({profileType: selectedProfile.type});
    }
    return DASHBOARD;
  }

  getUrlWithProfileType(url) {
    const {selectedProfile} = this.props;
    if (selectedProfile) {
      const toPath = pathToRegExp.compile(url);
      return toPath({profileType: selectedProfile.type});
    }
    return DASHBOARD;
  }

  render() {
    const dashboardAthleteSchedulerHistory = this.getUrlWithProfileType(DASHBOARD_ATHLETE_SCHEDULER_HISTORY);
    return (
      <div className="scheduler-wrapper">
        <div className="scheduler-header">
          <div className="uk-grid">
            <div className="uk-width-medium-6-10" >
              <Tabs/>
            </div>
            <div className="uk-width-medium-4-10">
              <div className="scheduler-headerViewSwitcher">
                <ul>
                  <li><Link to={dashboardAthleteSchedulerHistory}> {this.props.p.t('AthleteSchedule.session_history')}</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Switch>
          <Route path={DASHBOARD_ATHLETE_SCHEDULER_SCHEDULED} component={Scheduled}/>
          <Route path={DASHBOARD_ATHLETE_SCHEDULER_UNSCHEDULED} component={Unscheduled}/>
          <Route path={DASHBOARD_ATHLETE_SCHEDULER_CHANGES} component={Changes}/>
          <Redirect exact from={DASHBOARD_ATHLETE_SCHEDULER_MANAGE_SESSION} to={this.getRedirectPath()}/>
        </Switch>
      </div>);
  }

  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      selectedProfile: PropTypes.object.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {userProfiles} = state;
  const {selectedProfile} = userProfiles;
  return {
    selectedProfile
  };
};

export default connect(mapStateToProps)(withRouter(translate(AthleteSchedule)));
