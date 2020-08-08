import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import pathToRegExp from 'path-to-regexp';

import AthleteProfile from '../../../components/athlete/registration/complete/AthleteProfile';
import AthletePreferences from '../../../components/athlete/registration/complete/AthletePreferences';
import AthleteAccount from '../../../components/athlete/registration/complete/AthleteAccount';
import AthleteShortProfile from '../../../components/athlete/registration/short/AthleteProfile';

import {
  REGISTRATION_ATHLETE_PROFILE,
  REGISTRATION_ATHLETE_PREFERENCES,
  REGISTRATION_ATHLETE_ACCOUNT,
  REGISTRATION_ATHLETE_SHORT,
  ATHLETE
} from '../../../constants/pathConstants';
import {isShortRegFlow} from '../../../utils/registration';

class Athlete extends Component {
  constructor() {
    super();
    this.getRedirectUrl = this.getRedirectUrl.bind(this);
  }

  getRedirectUrl() {
    const flag = isShortRegFlow();
    const path = flag ? REGISTRATION_ATHLETE_SHORT : REGISTRATION_ATHLETE_PROFILE;
    const {selectedProfile} = this.props;
    if (selectedProfile) {
      const toPath = pathToRegExp.compile(path);
      return toPath({profileType: selectedProfile.type});
    }
    return REGISTRATION_ATHLETE_PROFILE;
  }

  render() {
    const redirectPath = this.getRedirectUrl();
    return (
      <Switch>
        <Route path={REGISTRATION_ATHLETE_PROFILE} name="AthleteRegistration" component={AthleteProfile}/>
        <Route path={REGISTRATION_ATHLETE_PREFERENCES} name="AthleteRegistration2" component={AthletePreferences}/>
        <Route path={REGISTRATION_ATHLETE_ACCOUNT} name="AthleteRegistration3" component={AthleteAccount}/>
        <Route path={REGISTRATION_ATHLETE_SHORT} name="AthleteShortRegistration" component={AthleteShortProfile}/>
        <Redirect exact from={ATHLETE} to={redirectPath}/>
      </Switch>
    );
  }
}

Athlete.defaultProps = {
  history: {}
};

Athlete.propTypes = {
  selectedProfile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const {userProfiles} = state;
  const {selectedProfile} = userProfiles;
  return {
    selectedProfile
  };
};

export default connect(mapStateToProps)(Athlete);
