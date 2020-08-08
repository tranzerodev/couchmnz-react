import React, {Component} from 'react';
import {Redirect, Switch, withRouter, Route} from 'react-router-dom';
import ProfileDetails from './Details';
import ProfileSkills from './Skills';
import {DASHBOARD_ATHLETE_PROFILE_DETAILS, DASHBOARD_ATHLETE_ACCOUNT_SKILLS} from '../../../../constants/pathConstants';

class AthleteProfileIndex extends Component {
  render() {
    return (
      <Switch>
        <Route path={DASHBOARD_ATHLETE_PROFILE_DETAILS} component={ProfileDetails}/>
        <Route path={DASHBOARD_ATHLETE_ACCOUNT_SKILLS} component={ProfileSkills}/>
        <Redirect from="/" to={DASHBOARD_ATHLETE_PROFILE_DETAILS}/>
      </Switch>
    );
  }
}

export default (withRouter(AthleteProfileIndex));
