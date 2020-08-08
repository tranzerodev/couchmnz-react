import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import pathToRegExp from 'path-to-regexp';

import DashboardMessages from '../../common/messages/DashboardMessages';
import {DASHBOARD_SSP, DASHBOARD_PARENT} from '../../../constants/pathConstants';
import ParentDashboard from '../../parent/dashboard/Index';

import IspDashboard from '../../ssp/isp/dashboard/Index';
import AthleteDashboard from '../../athlete/dashboard/Index';
import {MESSAGES_ROUTER_PATH} from '../../../constants/RouterPaths';
import {
  DASHBOARD_ATHLETE,
  DASHBOARD_LINK,
  DASHBOARD_PROFILE_TYPE
} from '../../../constants/pathConstants';
import {profileStage} from '../../../routeMiddlewares/routeMiddlewares';

const athleteDashboard = profileStage(AthleteDashboard);
const parentDashboard = profileStage(ParentDashboard);

class Home extends Component {
  constructor() {
    super();
    this.getRedirectPath = this.getRedirectPath.bind(this);
  }

  getRedirectPath() {
    const {selectedProfile} = this.props;
    if (selectedProfile) {
      const toPath = pathToRegExp.compile(DASHBOARD_PROFILE_TYPE);
      return toPath({profileType: selectedProfile.type});
    }
    return DASHBOARD_SSP;
  }

  render() {
    const path = this.getRedirectPath();
    return (
      <Switch>
        <Route path={DASHBOARD_SSP} component={IspDashboard}/>
        <Route path={MESSAGES_ROUTER_PATH} component={DashboardMessages}/>
        <Route path={DASHBOARD_ATHLETE} component={athleteDashboard}/>
        <Route path={DASHBOARD_PARENT} component={parentDashboard}/>
        <Redirect exact from={DASHBOARD_LINK} to={path}/>
      </Switch>
    );
  }
}

Home.propTypes = {
  selectedProfile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const {userProfiles} = state;
  const {selectedProfile} = userProfiles;
  return {
    selectedProfile
  };
};

export default connect(mapStateToProps)(Home);
