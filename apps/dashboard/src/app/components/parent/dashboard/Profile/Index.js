import React, {Component} from 'react';
import {Redirect, Switch, withRouter, Route} from 'react-router-dom';
import ProfileDetails from './Details';
import ProfileSkills from './Skills';
import {PARENT_PROFILE_DETAILS, PARENT_PROFILE_SKILLS} from '../../../../constants/pathConstants';

class AthleteProfileIndex extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={PARENT_PROFILE_DETAILS} component={ProfileDetails}/>
        <Route exact path={PARENT_PROFILE_SKILLS} component={ProfileSkills}/>
        <Redirect from="/" to={PARENT_PROFILE_DETAILS}/>
      </Switch>
    );
  }
}

export default (withRouter(AthleteProfileIndex));
