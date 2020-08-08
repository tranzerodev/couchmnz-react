import React from 'react';
import {NavLink, Route, withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';
import PropTypes from 'prop-types';
import * as RouterPaths from '../../../constants/RouterPaths';
import {
  DASHBOARD_SSP, DASHBOARD_SCHEDULES, DASHBOARD_SESSIONS, DASHBOARD_ACCOUNT, 
  DASHBOARD_MANAGE_SPORT, DASHBOARD_SPORTS, DASHBOARD_ISP_LANDING,
  BOOKINGS_PATH, CALENDAR_PATH, DASHBOARD_PATH, MESSAGES_PATH, ACCOUNTS_PATH
} from '../../../constants/pathConstants';
import appConstants from '../../../constants/appConstants';
import {FULFILLED, PENDING} from '../../../constants/ActionTypes';
import {getSportsCompletionStatus} from '../../../validators/ssp/isp/common/completedServiceProfile';

class DashboardNav extends React.Component {
  constructor(props) {
    super(props);
    this.handleSportStatus = this.handleSportStatus.bind(this);
    this.state = {
      isActiveSport: false
    };
  }
  componentDidMount() {
    const {profile, serviceProfiles} = this.props;
    const profileId = profile.status === FULFILLED && profile.data.profile && profile.data.profile.id ? profile.data.profile.id : null;
    if (profileId && serviceProfiles.status !== PENDING && serviceProfiles.status !== FULFILLED) {
      this.props.fetchServiceProfiles({profileId});
    } else {
      const isActiveSport = this.handleSportStatus(this.props.serviceProfiles);
      this.setState({isActiveSport});
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.serviceProfiles.status === PENDING && nextProps.serviceProfiles.status === FULFILLED) {
      const isActiveSport = this.handleSportStatus(nextProps.serviceProfiles);
      this.setState({isActiveSport});
    }
  }
  handleSportStatus(serviceProfiles) {
    if (this.props.profile.status === FULFILLED && this.props.profile.data.profile.isActive === appConstants.profileActiveFlages.active) {
      return true;
    }
    const {data} = serviceProfiles;
    if (data) {
      for (let i = 0; i < data.length; i++) {
        const profile = data[i];
        if (profile.isActive === appConstants.sportsActiveFlages.active) {
          return true;
        }
        const status = getSportsCompletionStatus(profile.sectionStatus);
        if (status) {
          return status;
        }
      }
    }
    return false;
  }

  render() {
    const {isActiveSport} = this.state;
    return (
      <section className="subHeaderSection subHeaderSection1-2">
        <div className="uk-container-fluid uk-container-center">
          <div className="uk-grid">
            <div className="uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
              <ul className="subHeaderMenu">
                <li>
                  <a href={DASHBOARD_PATH()}>{this.props.p.t('dashboard')}</a>
                </li>
                <li>
                  <a href={CALENDAR_PATH()}>{this.props.p.t('calendar')}</a>
                </li>
                <li>
                  <a href={BOOKINGS_PATH()}>{this.props.p.t('bookings')}</a>
                </li>
              
                {/* <li>
                  <NavLink to={DASHBOARD_ISP_LANDING}>{this.props.p.t('DashboardNav.dashboard')}</NavLink>
                </li>
                <li>
                  <NavLink to={DASHBOARD_SCHEDULES}>{this.props.p.t('DashboardNav.schedules')}</NavLink>
                </li> */}
                <li> 
                  <NavLink to={DASHBOARD_SPORTS} >{this.props.p.t('DashboardNav.service_profiles')}</NavLink>
                </li>
                <li>
                  <a href={MESSAGES_PATH()}>{this.props.p.t('messages')}</a>
                </li>
                
                {/* <li>
                  <NavLink to={RouterPaths.MESSAGES_ROUTER_PATH}>{this.props.p.t('DashboardNav.messages')}</NavLink>
                </li> */}
                {/*  <li>
                  <NavLink to={DASHBOARD_REWARDS} >{this.props.p.t('DashboardNav.rewards')}</NavLink>
                </li> */}
                <li>
                  <a href={ACCOUNTS_PATH('businessModel')} >{this.props.p.t('DashboardNav.account')}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    );
  }
}
DashboardNav.propTypes = {
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  profile: PropTypes.object.isRequired,
  fetchServiceProfiles: PropTypes.func.isRequired,
  serviceProfiles: PropTypes.object.isRequired
};
export default withRouter(translate(DashboardNav));
/* eslint react/no-deprecated: 0 */
