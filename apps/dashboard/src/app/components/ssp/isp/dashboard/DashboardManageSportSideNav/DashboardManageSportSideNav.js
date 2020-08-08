import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';

import {
  DASHBOARD_MANAGE_SPORT_SPECIALITY,
  DASHBOARD_MANAGE_SPORT_TRAINING_PREFERENCES,
  DASHBOARD_MANAGE_SPORT_PRICING,
  DASHBOARD_MANAGE_SPORT_TRAINING_LOCATIONS,
  DASHBOARD_MANAGE_SPORT_SESSIONS,
  DASHBOARD_MANAGE_SPORT_BIOGRAPHY,
  DASHBOARD_MANAGE_SPORT_LISTING,
  DASHBOARD_MANAGE_SPORT_MEDIA,
  DASHBOARD_MANAGE_COMPLETE_BOOKING_PREFERENCE,
  DASHBOARD_MANAGE_COMPLETE_ACCOUNT_DETAILS,
  DASHBOARD_MANAGE_COMPLETE_PAYOUT_DETAILS,
  DASHBOARD_MANAGE_COMPLETE_SCHEDULER_SETTINGS
} from '../../../../../constants/pathConstants';
import SportsSwitcher from '../SportsSwitcher';
import getSportDataFilledStatus from '../../../../../validators/ssp/isp/common/getCurrentSportStatus';
import appConstants from '../../../../../constants/appConstants';
import {fetchSessions, ispFetchServiceProfiles, ispFetchWorkingDays} from '../../../../../actions/index';
import {FULFILLED, PENDING} from '../../../../../constants/ActionTypes';
import getSportCompletionStatus from '../../../../../validators/ssp/isp/registration/getSportCompletionStatus';
import getCompletedServiceProfile from '../../../../../validators/ssp/isp/common/completedServiceProfile';
import {getProfileStatus} from '../../../../../validators/ssp/isp/registration/registrationPageStatus';
import getProfilePagesCompletionStatus from '../../../../../validators/ssp/isp/registration/getProfileCompletionStatus';

const {complete, disabled, intermediate} = appConstants.RegistrationFlowPageStatusFlags;

class DashboardManageSportSideNav extends React.Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.setSportsDataStatus = this.setSportsDataStatus.bind(this);
    this.renderList = this.renderList.bind(this);
    this.getServiceCompletionStatus = this.getServiceCompletionStatus.bind(this);
    this.getProfileCompletionStatus = this.getProfileCompletionStatus.bind(this);

    const intermediate = appConstants.RegistrationFlowPageStatusFlags.intermediate;
    const disable = appConstants.RegistrationFlowPageStatusFlags.disable;
    this.state = {
      status: {
        trainingPreference: disable,
        sport: intermediate,
        listing: disable,
        media: disable,
        biography: disable,
        pricing: disable,
        trainingLocation: disable,
        session: disable,
        travelPreferences: disable,
        businessModel: intermediate,
        bookingPreference: intermediate,
        accountDetails: intermediate,
        payoutDetails: intermediate,
        schedulerWorkingDays: intermediate
      }
    };
  }

  componentDidMount() {
    if (this.props.sessions.status !== FULFILLED && this.props.sessions.status !== PENDING && this.props.profile.status === FULFILLED && this.props.currentSport.status === FULFILLED) {
      this.props.fetchSessions({profileID: this.props.profile.data.profile.id, sportID: this.props.currentSport.data.id});
    }
    const {currentSport, sessions, profile, workingDays, serviceProfiles} = this.props;
    this.setSportsDataStatus({currentSport, sessions, profile, workingDays});
    // This.setProfileDataStatus({profile, workingDays});
    const {status} = serviceProfiles;
    if (status === null) {
      this.props.ispFetchServiceProfiles({profileId: profile.data.profile.id});
    }

    if (workingDays.status === null) {
      this.props.ispFetchWorkingDays({profileId: profile.data.profile.id});
    }
  }

  componentWillReceiveProps(nextProps) {
    const {currentSport, sessions, workingDays, profile} = nextProps;
    this.setSportsDataStatus({currentSport, sessions, profile, workingDays});
  }

  setSportsDataStatus({currentSport, sessions, profile, workingDays}) {
    console.log('currentSport', currentSport)
    console.log('currentSport', profile)
    const sportStatusVal = getSportDataFilledStatus(currentSport, sessions);
    const profileStatusVal = getProfileStatus(profile, workingDays.data);
    this.setState({status: Object.assign({}, profileStatusVal, sportStatusVal)});
  }

  getServiceCompletionStatus() {
    const {serviceProfiles} = this.props;
    const {status} = this.state;
    const currentSportCompletionStatus = getSportCompletionStatus(status);
    console.log('currentSportCompletionStatus', currentSportCompletionStatus)
    if (currentSportCompletionStatus) {
      return true;
    }
    const completedService = getCompletedServiceProfile(serviceProfiles.data);
    if (completedService) {
      return intermediate;
    }
    return disabled;
  }

  getProfileCompletionStatus() {
    const {profile, workingDays, profileActivationStatus} = this.props;
    if (profileActivationStatus) {
      return true;
    }
    const sportsCompletionStatus = this.getServiceCompletionStatus();
    console.log('sportsCompletionStatus', sportsCompletionStatus)
    if ( sportsCompletionStatus == true ) {
      return true
    }
    if (sportsCompletionStatus === intermediate || sportsCompletionStatus === complete) {
      const status = getProfileStatus(profile, workingDays.data);
      return getProfilePagesCompletionStatus(status);
    }
    return false;
  }

  renderItem(name, link, type) {
    const {status} = this.state;
    const {red, gray, green} = appConstants.sportsDataStatusColorCodes;
    //  Const currentSportCompletionStatus = getSportCompletionStatus(status);
    if ((name === this.props.p.t('DashboardAccountSideNav.booking_preferences')) && (status.sport === intermediate)) {
      return (
        <li className="disable">
          <span className="disable-link"><span className="gray"/> <span className="cl-menu-text">{name}</span></span>
        </li>
      );
    } else if ((name === this.props.p.t('DashboardAccountSideNav.payout_details')) && (status.sport === intermediate)) {
      return (
        <li className="disable">
          <span className="disable-link"><span className="gray"/> <span className="cl-menu-text">{name}</span></span>
        </li>
      );
    } else if ((name === this.props.p.t('DashboardAccountSideNav.account_details')) && (status.sport === intermediate)) {
      return (
        <li className="disable">
          <span className="disable-link"><span className="gray"/> <span className="cl-menu-text">{name}</span></span>
        </li>
      );
    } else if ((name === this.props.p.t('DashboardAccountSideNav.scheduler')) && (status.sport === intermediate)) {
      return (
        <li className="disable">
          <span className="disable-link"><span className="gray"/> <span className="cl-menu-text">{name}</span></span>
        </li>
      );
    }
    return (
      type === disabled ?
        <li className="disable">
          <span className="disable-link"><span className="gray"/> <span className="cl-menu-text">{name}</span></span>
        </li> :
        <li>
          <NavLink to={link}><span className={type === complete ? green : type === intermediate ? red : gray}/> <span className="cl-menu-text">{name}</span></NavLink>
        </li>
    );
  }

  renderList(status) {
    const {profileActivationStatus, offerTerminology, p} = this.props;
    const {t} = p;
    const profileCompletion = this.getProfileCompletionStatus();
    const offerTerminologyText = offerTerminology.singular;
    
    return (
      <ul>
        {
          this.renderItem(t('DashboardProfileSideNav.sports_and_certificate'), DASHBOARD_MANAGE_SPORT_SPECIALITY, status.sport)
        }
        {
          this.renderItem(t('DashboardProfileSideNav.preference', {offerTerminology: offerTerminologyText}), DASHBOARD_MANAGE_SPORT_TRAINING_PREFERENCES, status.trainingPreference)
        }
        {
          this.renderItem(t('DashboardSessionSideNav.set_pricing'), DASHBOARD_MANAGE_SPORT_PRICING, status.pricing)
        }
        {/* {
          this.renderItem(this.props.p.t('DashboardProfileSideNav.travel_preference'), DASHBOARD_MANAGE_SPORT_TRAVEL_PREFRENCES, status.travelPreferences)
        } */}
        {
          this.renderItem(t('DashboardSessionSideNav.locations', {offerTerminology: offerTerminologyText}), DASHBOARD_MANAGE_SPORT_TRAINING_LOCATIONS, status.trainingLocation)
        }
        {
          this.renderItem(t('DashboardSessionSideNav.define', {offerTerminology: offerTerminologyText}), DASHBOARD_MANAGE_SPORT_SESSIONS, status.session)
        }
        {
          this.renderItem(t('DashboardProfileSideNav.biography'), DASHBOARD_MANAGE_SPORT_BIOGRAPHY, status.biography)
        }
        {
          this.renderItem(t('DashboardProfileSideNav.listing_details'), DASHBOARD_MANAGE_SPORT_LISTING, status.listing)
        }
        {
          this.renderItem(t('DashboardProfileSideNav.photos_and_videos'), DASHBOARD_MANAGE_SPORT_MEDIA, status.media)
        }
        { profileCompletion === true && (
          <li>
            <span className="cl-sd-menuSeparetor"/>
          </li>)}
        {/* { profileActivationStatus === false && profileCompletion === false &&
          this.renderItem(this.props.p.t('DashboardProfileSideNav.complete_service_profile'), DASHBOARD_MANAGE_COMPLETE_SERVICE, completionStatus) */
        }
        { profileCompletion === true &&
         this.renderItem(t('DashboardAccountSideNav.booking_preferences'), DASHBOARD_MANAGE_COMPLETE_BOOKING_PREFERENCE, status.bookingPreference)
        }
        { profileCompletion === true &&
          this.renderItem(t('DashboardAccountSideNav.account_details'), DASHBOARD_MANAGE_COMPLETE_ACCOUNT_DETAILS, status.accountDetails)
        }
        { profileCompletion === true &&
          this.renderItem(t('DashboardAccountSideNav.payout_details'), DASHBOARD_MANAGE_COMPLETE_PAYOUT_DETAILS, status.payoutDetails)
        }
        { profileCompletion === true && this.props.currentSport && this.props.currentSport.data && this.props.currentSport.data.name && this.props.serviceProfiles && this.props.serviceProfiles.data &&
        <li>
            <a href={DASHBOARD_MANAGE_COMPLETE_SCHEDULER_SETTINGS(this.props.currentSport.data.name)}>
              <span className={(
                              this.props.serviceProfiles.data[0] && this.props.serviceProfiles.data[0].sectionStatus.WORKING_HOURS == 'Y' && this.props.serviceProfiles.data[0].sectionStatus.DYNAMIC_SESSION == 'N'  && this.props.serviceProfiles.data[0].sectionStatus.SCHEDULES == 'Y' ) ||
                              this.props.serviceProfiles.data[0] && this.props.serviceProfiles.data[0].sectionStatus.WORKING_HOURS == 'Y' && this.props.serviceProfiles.data[0].sectionStatus.DYNAMIC_SESSION == 'Y'
                                ? 'green' 
                                : this.props.serviceProfiles.data && this.props.serviceProfiles.data[0].sectionStatus.WORKING_HOURS == 'N' ? 'red' 
                                : 'gray'} /> 
              <span className="cl-menu-text">{t('DashboardAccountSideNav.scheduler')}</span>
            </a>
          </li>                
        }
      </ul>
    );
  }

  render() {
    const {status} = this.state;
    const {sport, p} = this.props;
    const isNewSport = (sport.id === null);
    
    return (
      <div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="leftPanel">
          <div className="profileMenu profileMenuSec">
            <SportsSwitcher {...this.props}/>
            {/* {(isNewSport) ? <h5>{p.t('DashboardProfileSideNav.newSport')}</h5> : <SportsSwitcher/>}  */}
            {
              this.renderList(status)
            }
          </div>
        </div>
      </div>
    );
  }

  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
      sessions: PropTypes.object.isRequired,
      currentSport: PropTypes.object.isRequired,
      fetchSessions: PropTypes.func.isRequired,
      profile: PropTypes.object.isRequired,
      sport: PropTypes.object.isRequired,
      profileActivationStatus: PropTypes.bool.isRequired,
      serviceProfiles: PropTypes.object.isRequired,
      ispFetchServiceProfiles: PropTypes.func.isRequired,
      workingDays: PropTypes.object.isRequired,
      ispFetchWorkingDays: PropTypes.func.isRequired,
      offerTerminology: PropTypes.object.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {
    sessions,
    currentSport,
    profile,
    sport,
    userProfiles,
    serviceProfiles,
    workingDays
  } = state;
  return {
    sessions,
    currentSport,
    profile,
    sport,
    profileActivationStatus: userProfiles.selectedProfile.isActive === appConstants.profileActiveFlages.active,
    serviceProfiles,
    workingDays,
    offerTerminology: currentSport.data && currentSport.data.offerTerminology ? currentSport.data.offerTerminology : {singular: appConstants.defaultOfferTerminology}
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSessions: params => dispatch(fetchSessions(params)),
    ispFetchServiceProfiles: profileID => dispatch(ispFetchServiceProfiles(profileID)),
    ispFetchWorkingDays: params => dispatch(ispFetchWorkingDays(params))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate(DashboardManageSportSideNav)));
/* eslint react/no-deprecated: 0 */
