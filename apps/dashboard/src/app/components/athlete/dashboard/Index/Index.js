import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import pathToRegExp from 'path-to-regexp';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';

import NavBar from '../NavBar';
import {DASHBOARD_ATHLETE, DASHBOARD_ATHLETE_ACCOUNT, DASHBOARD_ATHLETE_PROFILE, DASHBOARD, DASHBOARD_ATHLETE_SCHEDULE} from '../../../../constants/pathConstants';
import Schedule from '../Schedule/Index';
import Account from '../Account';
import Profile from '../Profile';
import DashboardSecondHeader from '../DashboardSecondHeader';

class AthleteDashboardIndex extends Component {
  constructor() {
    super();
    this.getRedirectPath = this.getRedirectPath.bind(this);
  }

  getRedirectPath() {
    const {selectedProfile} = this.props;
    if (selectedProfile) {
      const toPath = pathToRegExp.compile(DASHBOARD_ATHLETE_PROFILE);
      return toPath({profileType: selectedProfile.type});
    }
    return DASHBOARD;
  }

  render() {
    const redirectPath = this.getRedirectPath();
    return (
      <div>
        <NavBar/>
        <section className="dashboardHeaderOuter dashboardHeaderOuter1-2 ">
          <div className="uk-container-fluid uk-container-center">
            <div className="tableDiv">
              <div className="dashboardContentLeft">
                <DashboardSecondHeader/>
                <div className="booking-wrapper-outer"/>
                <Switch>
                  <Route path={DASHBOARD_ATHLETE_SCHEDULE} component={Schedule}/>
                  <Route path={DASHBOARD_ATHLETE_ACCOUNT} component={Account}/>
                  <Route path={DASHBOARD_ATHLETE_PROFILE} component={Profile}/>
                  <Redirect exact from={DASHBOARD_ATHLETE} to={redirectPath}/>
                </Switch>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

AthleteDashboardIndex.propTypes = {
  selectedProfile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const {userProfiles} = state;
  const {selectedProfile} = userProfiles;
  return {
    selectedProfile
  };
};

export default connect(mapStateToProps)(AthleteDashboardIndex);
