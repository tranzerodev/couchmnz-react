import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import DashboardScheduleASession from '../DashboardScheduleSessions';
import DashboardManageBooking from '../DashboardManageBooking';
import DashboardSessionHistory from '../DashboardSessionHistory';
import DashboadrSessionDetails from '../DashboardSessionDetails';
import {DASHBOARD_SCHEDULES,
  DASHBOARD_SCHEDULE_SESSION,
  DASHBOARD_MANAGE_BOOKING,
  DASHBOARD_SESSION_HISTORY,
  DASHBOARD_SESSION_DETAILS,
  DASHBOARD_SPORTS
} from '../../../../../constants/pathConstants';
import {Route, Switch, NavLink} from 'react-router-dom';
import {Redirect} from 'react-router';
import {fetchISPTrainedAthletes, activateNewProfile, ispFetchServiceProfiles, ispFetchWorkingDays, fetchManageBookings} from '../../../../../actions';
import {FULFILLED, PENDING} from '../../../../../constants/ActionTypes';
import appConstants from '../../../../../constants/appConstants';
import {getProfileStatus} from '../../../../../validators/ssp/isp/registration/registrationPageStatus';
import getProfilePagesCompletionStatus from '../../../../../validators/ssp/isp/registration/getProfileCompletionStatus';
import RegCompleteModal from '../../registration/RegCompleteModal/RegCompleteModal';
import Modal from '../../../../common/Modal';
import QueryString from 'query-string';
import {getSportsCompletionStatus} from '../../../../../validators/ssp/isp/common/completedServiceProfile';
import getSportsDataFilledStatus from '../../../../../validators/ssp/isp/common/getCurrentSportStatus';

class DashboardSchedules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showActivation: true,
      isOpenModal: false
    };
    this.handleViewChange = this.handleViewChange.bind(this);
    this.handleShowActivation = this.handleShowActivation.bind(this);
    this.handleActivateProfile = this.handleActivateProfile.bind(this);
    this.handleActiveSport = this.handleActiveSport.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  handleViewChange(flag) {
    this.setState({showDragAndContent: flag});
  }

  componentDidMount() {
    const {manageBookings, userProfiles, trainedAthletes, workingDays} = this.props;
    if (trainedAthletes.status !== FULFILLED && trainedAthletes.status !== PENDING) {
      const profileID = userProfiles.selectedProfile.id;

      this.props.fetchISPTrainedAthletes(profileID);
    }
    if (workingDays.status !== FULFILLED && workingDays.status !== PENDING) {
      this.props.ispFetchWorkingDays({profileId: userProfiles.selectedProfile.id});
    }
    const profileId = userProfiles.selectedProfile.id;
    this.props.ispFetchServiceProfiles({profileId});
    if (!((manageBookings.status) || (manageBookings.status && manageBookings.status !== FULFILLED))) {
      const limit = appConstants.ISPSessionHistory.pageLimit;
      const queryUrlString = QueryString.stringify({
        page: 0,
        limit
      });
      this.props.fetchManageBookings(userProfiles.selectedProfile.id, queryUrlString);
    }
  }

  handleActivateProfile() {
    const {profile, workingDays, userProfiles} = this.props;
    const status = getProfileStatus(profile, workingDays.data);
    const completed = getProfilePagesCompletionStatus(status);
    const isActive = Boolean(profile && profile.status === FULFILLED && profile.data.profile.isActive === appConstants.profileActiveFlages.active);
    const profileID = userProfiles.status === FULFILLED && userProfiles.selectedProfile ? userProfiles.selectedProfile.id : null;
    if (!isActive && completed && profileID) {
      this.props.activateNewProfile({profileID});
    }
  }

  handleFindActiveSport(sport) {
    return sport.isActive === appConstants.sportsActiveFlages.active;
  }

  handleActiveSport() {
    const {serviceProfiles} = this.props;
    if (serviceProfiles.status === FULFILLED) {
      const activeSport = serviceProfiles.data.find(this.handleFindActiveSport);
      if (activeSport) {
        return activeSport;
      }
    }
    return null;
  }

  handleShowActivation() {
    const {showActivation} = this.state;
    this.setState({showActivation: !showActivation});
  }

  onCloseModal() {
    this.setState({isOpenModal: false});
  }

  componentWillReceiveProps(nextProps) {
    // If (this.props.profileActivationStatus.status === PENDING && nextProps.profileActivationStatus.status === FULFILLED) {
    //   this.setState({isOpenModal: true});
    // }
  }

  render() {
    const {p, manageBookings, profile, workingDays, currentSport, sessions} = this.props;
    const manageBookingCount = manageBookings.data.length;
    const {showActivation} = this.state;
    const isActive = Boolean(profile && profile.status === FULFILLED && profile.data.profile.isActive === appConstants.profileActiveFlages.active);

    const profileStatus = getProfileStatus(profile, workingDays.data);
    const profileCompleted = getProfilePagesCompletionStatus(profileStatus);
    const sportStatus = getSportsDataFilledStatus(currentSport, sessions);
    const sportCompleted = getSportsCompletionStatus(sportStatus);
    return (
      <div className="dashboardSection">
        <div className="cl-individual-schedule-section">

          {!isActive && showActivation && profileCompleted && sportCompleted &&
            (
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                  <div className="cl-sd-final-stretch">
                    <span className="cl-sd-close" onClick={this.handleShowActivation}>
                      <svg className="cl-sd-cross-orange" xmlns="http://www.w3.org/2000/svg" viewBox="-317.53 -5232.53 19.061 19.061">
                        <g transform="translate(-1946.5 -5770.5)">
                          <line data-name="Line 230" className="cl-sd-cross-orange-1" x2={18} y2={18} transform="translate(1629.5 538.5)"/>
                          <line data-name="Line 231" className="cl-sd-cross-orange-1" x1={18} y2={18} transform="translate(1629.5 538.5)"/>
                        </g>
                      </svg>
                    </span>
                    <h3>{p.t('DashboardSchedules.activationTitle')}</h3>
                    <p>{p.t('DashboardSchedules.activationMessage', {session: 'Sessions'})} <br/> {p.t('DashboardSchedules.activationMessage2')} <NavLink to={DASHBOARD_SPORTS}>{p.t('DashboardSchedules.activationMessage3')}</NavLink></p>
                    <ul className="publishProfileStep">
                      <li>
                        <span>
                          <svg className="cl-icon-calendar-gray" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 63.898 65.351">
                            <g transform="translate(-6 -957.362)">
                              <path data-name="Path 291" className="cl-icon-calendar-gray-1" d="M23.45,957.362A1.452,1.452,0,0,0,22,958.814v8.9a5.854,5.854,0,1,0,2.9.023v-8.918A1.452,1.452,0,0,0,23.45,957.362Zm29.045,0a1.452,1.452,0,0,0-1.452,1.452v8.9a5.854,5.854,0,1,0,2.9.023v-8.918A1.452,1.452,0,0,0,52.494,957.362Zm-39.21,4.357A7.3,7.3,0,0,0,6,969v46.426a7.3,7.3,0,0,0,7.284,7.284H62.615a7.3,7.3,0,0,0,7.284-7.284V969a7.3,7.3,0,0,0-7.284-7.284H58.281a1.452,1.452,0,1,0,0,2.9h4.334A4.343,4.343,0,0,1,66.994,969V982.05H8.9V969a4.343,4.343,0,0,1,4.379-4.38h4.334a1.452,1.452,0,1,0,0-2.9H13.284Zm15.952,0a1.452,1.452,0,1,0,0,2.9H46.663a1.452,1.452,0,1,0,0-2.9H29.236Zm-5.786,8.713a2.9,2.9,0,1,1-2.9,2.9A2.883,2.883,0,0,1,23.45,970.432Zm29.045,0a2.9,2.9,0,1,1-2.9,2.9A2.883,2.883,0,0,1,52.494,970.432ZM8.9,984.955H66.994v30.474a4.343,4.343,0,0,1-4.379,4.379H13.284a4.343,4.343,0,0,1-4.379-4.379V984.955Z" transform="translate(0 0)"/>
                            </g>
                          </svg>
                        </span>
                        <p>{p.t('DashboardSchedules.p1')}<br/> {p.t('DashboardSchedules.sessions', {session: 'Sessions'})}</p>
                      </li>
                      <li>
                        <span>
                          <svg className="cl-icon-eye-gray" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 41.738">
                            <path className="cl-icon-eye-gray-1" d="M33.5,16.5c-17.214,0-30,15.98-30,20.87s12.786,20.87,30,20.87,30-15.98,30-20.87S50.714,16.5,33.5,16.5Zm0,39.13C17.113,55.63,6.109,40.513,6.109,37.37s11-18.261,27.391-18.261S60.891,34.226,60.891,37.37,49.886,55.63,33.5,55.63Zm0-28.7A10.435,10.435,0,1,0,43.935,37.37,10.447,10.447,0,0,0,33.5,26.935Zm0,18.261a7.826,7.826,0,1,1,7.826-7.826A7.835,7.835,0,0,1,33.5,45.2Z" transform="translate(-3.5 -16.5)"/>
                          </svg>
                        </span>
                        <p>{p.t('DashboardSchedules.p2')}<br/> {p.t('DashboardSchedules.serviceProfile', {service: 'Service'})}</p>
                      </li>
                      <li>
                        <span>
                          <svg className="cl-icon-listed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54.998 55">
                            <path className="cl-icon-listed-1" d="M14.25,6a8.25,8.25,0,1,0,8.25,8.25A8.271,8.271,0,0,0,14.25,6Zm0,2.75a5.5,5.5,0,1,1-5.5,5.5A5.479,5.479,0,0,1,14.25,8.75Zm14.921,1.375a1.375,1.375,0,1,0,0,2.75H59.6a1.375,1.375,0,1,0,0-2.75H29.171Zm-.58,5.5a1.375,1.375,0,1,0,0,2.75H46.327a1.375,1.375,0,1,0,0-2.75ZM14.25,25.25A8.25,8.25,0,1,0,22.5,33.5,8.271,8.271,0,0,0,14.25,25.25Zm0,2.75a5.5,5.5,0,1,1-5.5,5.5A5.479,5.479,0,0,1,14.25,28Zm14.921,1.375a1.375,1.375,0,1,0,0,2.75H59.6a1.375,1.375,0,1,0,0-2.75H29.171Zm-.58,5.5a1.375,1.375,0,1,0,0,2.75H46.327a1.375,1.375,0,1,0,0-2.75ZM14.25,44.5a8.25,8.25,0,1,0,8.25,8.25A8.271,8.271,0,0,0,14.25,44.5Zm0,2.75a5.5,5.5,0,1,1-5.5,5.5A5.479,5.479,0,0,1,14.25,47.25Zm14.921,1.375a1.375,1.375,0,1,0,0,2.75H59.6a1.375,1.375,0,1,0,0-2.75H29.171Zm-.58,5.5a1.375,1.375,0,1,0,0,2.75H46.327a1.375,1.375,0,1,0,0-2.75Z" transform="translate(-6 -6)"/>
                          </svg>
                        </span>
                        <p>{p.t('DashboardSchedules.p3')} <br/> {p.t('DashboardSchedules.listed')}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )
          }

          <div className="uk-grid">
            <div className="uk-width-large-7-10">
              <div className="cl-schedule-sub-nav">
                <ul>
                  <li>
                    <NavLink to={DASHBOARD_SCHEDULE_SESSION}>{p.t('DashboardSchedules.scheduleASession')}</NavLink>
                  </li>
                  <li>
                    <NavLink to={DASHBOARD_MANAGE_BOOKING}>{p.t('DashboardSchedules.manageBooking')}<span className="cl-schedule-booking-count"> ( {manageBookingCount} )</span></NavLink>
                  </li>
                  <li>
                    <NavLink to={DASHBOARD_SESSION_HISTORY}>{p.t('DashboardSchedules.sessionHistory')}</NavLink>
                  </li>
                </ul>
              </div>
            </div>
            {/* <div className="uk-width-large-3-10 uk-text-right cl-mb-booking-preference">
              <div data-uk-dropdown="{mode:'click', pos:'bottom-right'}" className="cl-booking-preference-dropdown" aria-haspopup="true" aria-expanded="false">
                {p.t('DashboardSchedules.bookingPrefarance')}
                <a className="cl-sd-speciality-link">
                  {p.t('DashboardSchedules.manual')}
                  <svg className="cl-icon-arrow-down" xmlns="http://www.w3.org/2000/svg" viewBox="-759.531 -5139.53 11.063 6.591">
                    <g transform="translate(-962.105 -6007)">
                      <path data-name="Path 148" className="cl-icon-arrow-down-1" d="M-17914.895-2197l5,5,5-5" transform="translate(18118 3065)"/>
                    </g>
                  </svg>
                </a>
                <ul className="uk-dropdown uk-dropdown-bottom">
                  <li>
                    <a >
                      {p.t('DashboardSchedules.manual')}
                      <span className="cl-sd-icon">
                        <svg className="cl-icon-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-804.53 -5141.531 6.591 11.063">
                          <g transform="translate(-1001.605 -5996.5)">
                            <path data-name="Path 149" className="cl-icon-arrow-right-1" d="M-17914.895-2197l5,5,5-5" transform="translate(2394.606 -17049.395) rotate(-90)"/>
                          </g>
                        </svg>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a >
                      {p.t('DashboardSchedules.automatic')}
                      <span className="cl-sd-icon">
                        <svg className="cl-icon-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-804.53 -5141.531 6.591 11.063">
                          <g transform="translate(-1001.605 -5996.5)">
                            <path data-name="Path 149" className="cl-icon-arrow-right-1" d="M-17914.895-2197l5,5,5-5" transform="translate(2394.606 -17049.395) rotate(-90)"/>
                          </g>
                        </svg>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div> */}
          </div>

          <Switch>
            <Route exact path={DASHBOARD_SCHEDULE_SESSION} component={DashboardScheduleASession}/>
            <Route exact path={DASHBOARD_MANAGE_BOOKING} component={DashboardManageBooking}/>
            <Route exact path={DASHBOARD_SESSION_HISTORY} component={DashboardSessionHistory}/>
            <Route exact path={DASHBOARD_SESSION_DETAILS} component={DashboadrSessionDetails}/>
            <Redirect exact from={DASHBOARD_SCHEDULES} to={DASHBOARD_SCHEDULE_SESSION}/>
          </Switch>

        </div>
        <Modal isModalOpen={this.state.isOpenModal} >
          <RegCompleteModal handleClose={this.onCloseModal}/>
        </Modal>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
      manageBookings: PropTypes.object,
      profile: PropTypes.object.isRequired,
      currentSport: PropTypes.object.isRequired,
      sessions: PropTypes.object.isRequired,
      workingDays: PropTypes.object.isRequired,
      activateNewProfile: PropTypes.func.isRequired,
      serviceProfiles: PropTypes.object.isRequired,
      fetchISPTrainedAthletes: PropTypes.func.isRequired,
      trainedAthletes: PropTypes.object.isRequired,
      ispFetchServiceProfiles: PropTypes.object.isRequired,
      fetchManageBookings: PropTypes.func.isRequired,
      ispFetchWorkingDays: PropTypes.object.isRequired,
      userProfiles: PropTypes.object.isRequired
    };
  }
}

DashboardSchedules.defaultProps = {
  manageBookings: {data: []}
};

const mapStateToProps = state => {
  const {manageBookings, profile, trainedAthletes, workingDays, userProfiles, profileActivationStatus, serviceProfiles, currentSport, sessions, scheduledSessions} = state;
  return {
    profile,
    manageBookings,
    trainedAthletes,
    workingDays,
    userProfiles,
    profileActivationStatus,
    serviceProfiles,
    currentSport,
    sessions,
    scheduledSessions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchISPTrainedAthletes: profileID => dispatch(fetchISPTrainedAthletes(profileID)),
    activateNewProfile: profileID => dispatch(activateNewProfile(profileID)),
    ispFetchServiceProfiles: profileID => dispatch(ispFetchServiceProfiles(profileID)),
    ispFetchWorkingDays: profileIdData => dispatch(ispFetchWorkingDays(profileIdData)),
    fetchManageBookings: (profileID, queryUrlString) => dispatch(fetchManageBookings(profileID, queryUrlString))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(translate(DashboardSchedules));
/* eslint react/no-deprecated: 0 */
