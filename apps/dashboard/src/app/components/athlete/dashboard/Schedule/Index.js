import React, {Component} from 'react';
import {Redirect, Switch, withRouter, Route} from 'react-router-dom';
import pathToRegExp from 'path-to-regexp';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';

import Schedule from './Schedule';
import SessionPackage from './SessionPackage';
import SessionSlots from './SessionSlots';
import ScheduleHistory from './ScheduleHistory';
import {
  DASHBOARD_ATHLETE_SCHEDULER_MANAGE_SESSION,
  DASHBOARD_ATHLETE_SCHEDULER_AVAILABLE_SLOTS,
  DASHBOARD_ATHLETE_SCHEDULE,
  DASHBOARD_ATHLETE_SCHEDULER_MANAGE_ORDER_ITEM,
  DASHBOARD_ATHLETE_SCHEDULER_HISTORY,
  DASHBOARD
} from '../../../../constants/pathConstants';

class AthleteScheduleIndex extends Component {
  constructor() {
    super();
    this.getRedirectPath = this.getRedirectPath.bind(this);
  }

  getRedirectPath() {
    const {selectedProfile} = this.props;
    if (selectedProfile) {
      const toPath = pathToRegExp.compile(DASHBOARD_ATHLETE_SCHEDULER_MANAGE_SESSION);
      return toPath({profileType: selectedProfile.type});
    }
    return DASHBOARD;
  }

  render() {
    const path = this.getRedirectPath();
    return (
      <Switch>
        <Route path={DASHBOARD_ATHLETE_SCHEDULER_MANAGE_ORDER_ITEM} component={SessionPackage}/>
        <Route path={DASHBOARD_ATHLETE_SCHEDULER_AVAILABLE_SLOTS} component={SessionSlots}/>
        <Route path={DASHBOARD_ATHLETE_SCHEDULER_MANAGE_SESSION} component={Schedule}/>
        <Route path={DASHBOARD_ATHLETE_SCHEDULER_HISTORY} component={ScheduleHistory}/>
        <Redirect exact from={DASHBOARD_ATHLETE_SCHEDULE} to={path}/>
      </Switch>
    );
  }
}

AthleteScheduleIndex.propTypes = {
  selectedProfile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const {userProfiles} = state;
  const {selectedProfile} = userProfiles;
  return {
    selectedProfile
  };
};

export default connect(mapStateToProps)(withRouter(AthleteScheduleIndex));
