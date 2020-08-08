import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';

import DashboardNav from '../../../../common/DashboardNav';
import SspDashboard from '../SspDashboard';
import DashboardSports from '../DashboardSports';
import Schedules from '../DashboardSchedules';
import DashboardAccount from '../DashboardAccount';
import DashboardMessages from '../../../../common/messages/DashboardMessages';
import Rewards from '../DashboardRewards';
import * as RouterPaths from '../../../../../constants/RouterPaths';
import BusinessModel from '../../../../common/RegBusinessModel/BusinessModel';
import DashboardSecondHeader from '../DashboardSecondHeader';
import IspLocation from '../Location';
import {
  DASHBOARD_SCHEDULES,
  DASHBOARD_REWARDS,
  DASHBOARD_ACCOUNT,
  DASHBOARD_SPORTS,
  DASHBOARD_ISP_LANDING,
  DASHBOARD_ISP_LOCATION,
  DASHBOARD_ISP_BUSINESS_MODEL,
  DASHBOARD_MANAGE_SPORT
} from '../../../../../constants/pathConstants';
import DashboardManageSport from '../DashboardManageSport';
import appConstants from '../../../../../constants/appConstants';
import {locationPrevalidation, servicePrevalidation, businessModelPrevalidation} from '../../../../../routeMiddlewares/ssp/isp/preValidations/preValidation.js';
import {ispFetchServiceProfiles,fetchCurrentSport} from '../../../../../actions/index';
import queryString from 'query-string'


const dashboardSports = servicePrevalidation(DashboardSports);
const ispLocation = locationPrevalidation(IspLocation);
const businessModel = businessModelPrevalidation(BusinessModel);

class IspDashboardIndex extends Component {
  constructor() {
    super();
    this.getRedirectPath = this.getRedirectPath.bind(this);
  }

  getRedirectPath() {
    const {selectedProfile} = this.props;
    if (selectedProfile.isActive === appConstants.profileActiveFlages.inactive) {
      return DASHBOARD_SPORTS;
    }
    return DASHBOARD_ISP_LANDING;
  }
  
  fetchSportId() {
    const {selectedProfile, profile, location} = this.props
    if ( location && location.search && profile && selectedProfile.isActive == 'Y' ) {
      const values = queryString.parse(location.search)
      if ( values && values.sportId ) {
        this.props.fetchCurrentSport({profileID: profile.data.profile.id, sportID: values.sportId});
      }
    }
  }
  
  componentDidUpdate() {
    //quick fix switch between two platform until all moved to SSR.
    this.fetchSportId()
  }  

  render() {
    const {profile, serviceProfiles} = this.props;
    const redirectPath = this.getRedirectPath();
    return (
      <div>
        <DashboardNav profile={profile} serviceProfiles={serviceProfiles} fetchServiceProfiles={this.props.ispFetchServiceProfiles}/>
        <section className="dashboardHeaderOuter dashboardHeaderOuter1-2">
          <div className="uk-container-fluid uk-container-center">
            <div className="tableDiv">
              <div className="dashboardContentLeft">
                <DashboardSecondHeader/>
                <div className="booking-wrapper">
                  <Switch>
                    <Route exact path={DASHBOARD_ISP_LANDING} component={SspDashboard}/>
                    <Route exact path={DASHBOARD_SPORTS} component={dashboardSports}/>
                    <Route path={DASHBOARD_MANAGE_SPORT} component={DashboardManageSport}/>
                    <Route path={DASHBOARD_ISP_LOCATION} component={ispLocation}/>
                    <Route exact path={DASHBOARD_ISP_BUSINESS_MODEL} component={businessModel}/>
                    <Route path={RouterPaths.MESSAGES_ROUTER_PATH} component={DashboardMessages}/>
                    <Route path={DASHBOARD_SCHEDULES} component={Schedules}/>
                    <Route path={DASHBOARD_ACCOUNT} component={DashboardAccount}/>
                    <Route path={DASHBOARD_REWARDS} component={Rewards}/>
                    <Redirect from="/" to={redirectPath}/>
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

IspDashboardIndex.propTypes = {
  selectedProfile: PropTypes.object.isRequired,
  serviceProfiles: PropTypes.object.isRequired,
  ispFetchServiceProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const {userProfiles, profile, serviceProfiles} = state;
  const {selectedProfile} = userProfiles;
  return {
    selectedProfile,
    profile,
    serviceProfiles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ispFetchServiceProfiles: profileID => dispatch(ispFetchServiceProfiles(profileID)),
    fetchCurrentSport: props => dispatch(fetchCurrentSport(props))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IspDashboardIndex);
