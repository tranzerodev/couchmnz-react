import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import pathToRegExp from 'path-to-regexp';

import ISPClass from '../ISP';
import Athlete from '../Athlete';
import {REGISTRATION_PROFILE_TYPE, ISP, ATHLETE, REGISTRATION, PARENT, DASHBOARD_LINK} from '../../../constants/pathConstants';
import Parent from '../Parent';

class Registration extends Component {
  constructor() {
    super();
    this.state = {};
  }
  getRedirectPath() {
    const {selectedProfile} = this.props;
    if (selectedProfile) {
      const toPath = pathToRegExp.compile(REGISTRATION_PROFILE_TYPE);
      return toPath({profileType: selectedProfile.type});
    }
    return REGISTRATION;
  }
  render() {
    const path = this.getRedirectPath();
    return (
      <Switch>
        <Route path={ATHLETE} name="Athlete" component={Athlete}/>
        <Route path={PARENT} name="Parent" component={Parent}/>
        <Redirect exact from={ISP} to={DASHBOARD_LINK}/>
        <Redirect from="/" to={path}/>
      </Switch>
    );
  }
}

Registration.propTypes = {
  selectedProfile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const {userProfiles} = state;
  const {selectedProfile} = userProfiles;
  return {
    selectedProfile
  };
};

export default connect(mapStateToProps)(Registration);
