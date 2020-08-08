import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import pathToRegExp from 'path-to-regexp';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';

import NavBar from '../NavBar';
import {PARENT_ACCOUNT, DASHBOARD_PARENT, PARENT_PROFILE, DASHBOARD, DASHBOARD_ATHLETE_SCHEDULE} from '../../../../constants/pathConstants';
import Account from '../Account';
import Profile from '../Profile';
import DashboardSecondHeader from '../DashboardSecondHeader/DashboardSecondHeader';
import Schedule from '../../../athlete/dashboard/Schedule';

class ParentDashboardIndex extends Component {
  constructor() {
    super();
    this.getRedirectPath = this.getRedirectPath.bind(this);
  }

  getRedirectPath() {
    const {selectedProfile} = this.props;
    if (selectedProfile) {
      const toPath = pathToRegExp.compile(PARENT_PROFILE);
      return toPath({profileType: selectedProfile.type});
    }
    return DASHBOARD;
  }
  render() {
    const redirectPath = this.getRedirectPath();
    return (
      <div>
        <NavBar/>
        <section className="dashboardHeaderOuter dashboardHeaderOuter1-2">
          <div className="uk-container-fluid uk-container-center">
            <div className="tableDiv">
              <div className="dashboardContentLeft">
                <DashboardSecondHeader/>
                <div className="booking-wrapper-outer"/>
                <Switch>
                  <Route path={DASHBOARD_ATHLETE_SCHEDULE} component={Schedule}/>
                  <Route path={PARENT_ACCOUNT} component={Account}/>
                  <Route path={PARENT_PROFILE} component={Profile}/>
                  <Redirect exact from={DASHBOARD_PARENT} to={redirectPath}/>
                </Switch>
              </div>
            </div>
          </div>
        </section>

      </div>
    );
  }
}

ParentDashboardIndex.propTypes = {
  selectedProfile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const {userProfiles} = state;
  const {selectedProfile} = userProfiles;
  return {
    selectedProfile
  };
};

export default connect(mapStateToProps)(ParentDashboardIndex);
