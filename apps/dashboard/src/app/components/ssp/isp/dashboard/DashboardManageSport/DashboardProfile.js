import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {DASHBOARD_PROFILE_BUILD_PROFILE, DASHBOARD_PROFILE_TRAINING_PREFERENCE, DASHBOARD_PROFILE_LISTING_DETAILS, DASHBOARD_PROFILE_PHOTOS_AND_VIDEOS, DASHBOARD_PROFILE_BIOGRAPHY} from '../../../../../constants/pathConstants';

import DashboardProfileSideNav from '../DashboardProfileSideNav';
import BuildProfile from './DashboardBuildProfile';
import TrainingPreference from './DashboardTrainingPreference';
import ProfileListing from './DashboardListing';
import Media from '../DashboardProfileMedia';
import Biography from './DashboardBiography';
class DashboardProfile extends Component {
  render() {
    return (
      <div className="dashboardSection">

        <div className="uk-grid">

          <DashboardProfileSideNav/>

          <Switch>
            <Route
              exact
              path={DASHBOARD_PROFILE_BUILD_PROFILE}
              name="Registration"
              component={BuildProfile}
            />
            <Route
              exact
              path={DASHBOARD_PROFILE_TRAINING_PREFERENCE}
              name="TrainingPreference"
              component={TrainingPreference}
            />
            <Route
              exact
              path={DASHBOARD_PROFILE_LISTING_DETAILS}
              name="Registration3"
              component={ProfileListing}
            />
            <Route
              exact
              path={DASHBOARD_PROFILE_PHOTOS_AND_VIDEOS}
              buttonText="Save"
              name="Registration4"
              component={Media}
            />
            <Route
              exact
              path={DASHBOARD_PROFILE_BIOGRAPHY}
              buttonText="Save"
              name="Registration4"
              component={Biography}
            />
            <Redirect from="/" to={DASHBOARD_PROFILE_BUILD_PROFILE}/>
          </Switch>

        </div>
      </div>
    );
  }
}
export default DashboardProfile;
