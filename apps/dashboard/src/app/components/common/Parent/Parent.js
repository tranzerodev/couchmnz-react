import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import pathToRegExp from 'path-to-regexp';

import ParentProfile from '../../../components/parent/registration/complete/ParentProfile';
import ParentPreferences from '../../../components/parent/registration/complete/ParentPreferences';
import ParentAccount from '../../../components/parent/registration/complete/ParentAccount';
import ParentShortProfile from '../../../components/parent/registration/short/ParentShort/ParentShortProfile';

// Import {
//   parentRegistration,
//   parentPreferences,
//   parentAccount
// } from '../../../routeMiddlewares/routeMiddlewares';
import {REGISTRATION_PARENT_PROFILE, REGISTRATION_PARENT_PREFERENCES, REGISTRATION_PARENT_ACCOUNT, PARENT, /* ,REGISTRATION_PARENT_SHORT */
  REGISTRATION_PARENT_SHORT} from '../../../constants/pathConstants';
import {isShortRegFlow} from '../../../utils/registration';

class Parent extends Component {
  constructor() {
    super();
    this.state = {};
  }

  getRedirectUrl() {
    const flag = isShortRegFlow();
    const path = flag ? REGISTRATION_PARENT_SHORT : REGISTRATION_PARENT_PROFILE;
    const {selectedProfile} = this.props;
    if (selectedProfile) {
      const toPath = pathToRegExp.compile(path);
      return toPath({profileType: selectedProfile.type});
    }
    return REGISTRATION_PARENT_PROFILE;
  }

  render() {
    const redirectPath = this.getRedirectUrl();
    return (
      <Switch>
        <Route path={REGISTRATION_PARENT_PROFILE} name="ParentRegistration" component={ParentProfile}/>
        <Route path={REGISTRATION_PARENT_PREFERENCES} name="ParentRegistration2" component={ParentPreferences}/>
        <Route path={REGISTRATION_PARENT_ACCOUNT} name="ParentRegistration3" component={ParentAccount}/>
        <Route path={REGISTRATION_PARENT_SHORT} name="ParentShortRegistration" component={ParentShortProfile}/>
        <Redirect exact from={PARENT} to={redirectPath}/>
      </Switch>
    );
  }
}

Parent.defaultProps = {
  history: {}
};

Parent.propTypes = {
  selectedProfile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const {userProfiles} = state;
  const {selectedProfile} = userProfiles;
  return {
    selectedProfile
  };
};

export default connect(mapStateToProps)(Parent);
