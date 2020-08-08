import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import {DASHBOARD_MANAGE_SPORT} from '../../../../../constants/pathConstants';
import {clearSportsRelatedStores, ispFetchServiceProfiles, ispFetchWorkingDays, fetchScheduledSessions} from '../../../../../actions';
import SportCard from '../SportCard';
import appConstants from '../../../../../constants/appConstants';
import {renderAllPage} from '../SportCard/PageStatus';
import {getProfileStatus} from '../../../../../validators/ssp/isp/registration/registrationPageStatus';
import getProfilePagesCompletionStatus from '../../../../../validators/ssp/isp/registration/getProfileCompletionStatus';
import ExampleModal from '../ExampleModal/ExampleModal';
import {SAMPLE_PROFILE} from '../../../../../constants/assetsPaths';
import {PENDING, FULFILLED} from '../../../../../constants/ActionTypes';
import getSportsDataFilledStatus from '../../../../../validators/ssp/isp/common/getCurrentSportStatus';
import {notFetched} from '../../../../../validators/common/util';
import {isFirstSport} from '../../../../../validators/ssp/isp/common/isFirstSport';

class DashboardSports extends Component {
  constructor(props) {
    super(props);
    this.handleAddNew = this.handleAddNew.bind(this);
    this.renderSports = this.renderSports.bind(this);
    this.renderAddAnotherButton = this.renderAddAnotherButton.bind(this);
    this.getProfileCompletionStatus = this.getProfileCompletionStatus.bind(this);
    this.renderSample = this.renderSample.bind(this);
    this.handleSampleModal = this.handleSampleModal.bind(this);
    this.handleFindSport = this.handleFindSport.bind(this);
    this.state = {
      isModalOpen: false
    };
  }

  componentWillMount() {
    const {userProfiles, serviceProfiles} = this.props;
    const profileId = userProfiles.selectedProfile && userProfiles.selectedProfile.id ? userProfiles.selectedProfile && userProfiles.selectedProfile.id : null;
    if (profileId && serviceProfiles.status !== PENDING && serviceProfiles.status !== FULFILLED) {
      this.props.ispFetchServiceProfiles({profileId});
    }
  }

  componentDidUpdate(preProps) {
    const {serviceProfiles, scheduledSessions, userProfiles} = this.props;
    const {selectedProfile} = userProfiles;
    if (preProps.serviceProfiles.status === PENDING && serviceProfiles.status === FULFILLED) {
      const isFirtSportActivation = isFirstSport(serviceProfiles.data);
      const isFetching = notFetched(scheduledSessions.status);
      console.log('isFirtSportActivation', isFirtSportActivation, isFetching, 'isFetching');
      if (isFirtSportActivation && isFetching) {
        this.props.fetchScheduledSessions(selectedProfile.id, (new Date().toISOString()));
      }
    }
  }

  componentDidMount() {
    console.log('DID_MOUNT_SPORTS');
    const {workingDays, profile, userProfiles, serviceProfiles, currentSport, sessions} = this.props;
    if (workingDays.status === null) {
      this.props.ispFetchWorkingDays({profileId: profile.data.profile.id});
    }
    if (serviceProfiles.status === FULFILLED && currentSport.status === FULFILLED) {
      console.log('DID_MOUNT_SPORTS', '_FULFILLED');
      if (!serviceProfiles.data.find(this.handleFindSport)) {
        console.log('DID_MOUNT_SPORTS', 'newSport');
        this.props.ispFetchServiceProfiles({profileId: userProfiles.selectedProfile.id});
      } else if (sessions.status === FULFILLED) {
        console.log('DID_MOUNT_SPORTS', 'existingSport');
        const sportStatusVal = getSportsDataFilledStatus(currentSport, sessions);
        const serviceProfile = serviceProfiles.data.find(this.handleFindSport);
        const {sectionStatus} = serviceProfile;
        const isStatusChnanged = this.handleServiceProfileStatus(sectionStatus, sportStatusVal);
        if (isStatusChnanged === true) {
          console.log('DID_MOUNT_SPORTS', 'statusChanged');
          this.props.ispFetchServiceProfiles({profileId: userProfiles.selectedProfile.id});
        }
      }
    }
  }

  handleServiceProfileStatus(prev, current) {
    console.log('prevStatus', prev, 'currStatus', current);
    return !(prev.BIOGRAPHY === current.biography &&
              prev.LISTINGS === current.listing &&
                prev.LOCATIONS === current.trainingLocation &&
                  prev.MEDIA === current.media &&
                    prev.PRICING === current.pricing &&
                      prev.SERVICES === current.sport &&
                        prev.SESSIONS === current.session &&
                          prev.TRAINING_PREF === current.trainingPreference);
  }

  handleFindSport(sport) {
    const {currentSport} = this.props;
    return sport && sport.sportId && currentSport.status === FULFILLED && currentSport.data.id === sport.sportId;
  }

  handleAddNew() {
    this.props.clearSportsRelatedStores();
    this.props.history.push(DASHBOARD_MANAGE_SPORT);
  }

  getProfileCompletionStatus() {
    const {profile, workingDays, isProfileActive} = this.props;
    if (isProfileActive) {
      return true;
    }
    const status = getProfileStatus(profile, workingDays.data);
    return getProfilePagesCompletionStatus(status);
  }

  renderSports(serviceProfiles) {
    const isProfileCompletd = this.getProfileCompletionStatus();
    
    if (serviceProfiles.data) {
      return (
        serviceProfiles.data.map(sport =>
          <SportCard key={sport.sportId} sport={sport} isProfileCompletd={isProfileCompletd}/>
        )
      );
    }
  }

  renderSample() {
    const {p, serviceProfiles} = this.props;
    const isFirstSport = serviceProfiles.data.length < 1;
    if (isFirstSport) {
      return (
        <div className="cl-servicebox">
          <a target="_blank" className="cl-serviceSampleBox" onClick={this.handleSampleModal}>
            <span className="cl-imageHolder cl-golf-image">
              <span className="cl-layer-black"/>
              <span className="cl-sampleRibbon">{p.t('DashboardSports.sample.ribbon_name')}</span>
              <span className="cl-sampleHeading">{p.t('DashboardSports.sample.sport_name')} </span>
              <span className="cl-smallText">{p.t('DashboardSports.sample.description')}</span>
            </span>
            {
              renderAllPage(appConstants.RegistrationFlowPageStatusFlags.complete, p.t, {singular: appConstants.defaultOfferTerminology, plural: appConstants.defaultOfferTerminologyPlural})
            }
          </a>
        </div>
      );
    }
  }

  renderAddAnotherButton() {
    const {p, serviceProfiles} = this.props;
    const isFirstSport = serviceProfiles.data.length < 1;
    return (
      <div className="cl-servicebox">
        <a onClick={this.handleAddNew} className="cl-addBoxFirstTime">
          <span className="cl-icon">
            <svg className="cl-icon-plus" xmlns="http://www.w3.org/2000/svg" viewBox="-21149.75 -6552.75 24.129 24.127">
              <g data-name="Symbol 27 – 2" transform="translate(-22854.186 -7086.772)">
                <g data-name="Group 2726" transform="translate(945.047 -998.235) rotate(45)">
                  <line data-name="Line 230" className="cl-icon-plus-1" x2="16" y2="16" transform="translate(1629.5 538.5)"/>
                  <line data-name="Line 231" className="cl-icon-plus-1" x1="16" y2="16" transform="translate(1629.5 538.5)"/>
                </g>
              </g>
            </svg>
          </span>
          <span className="cl-addServiceText">{isFirstSport ? p.t('DashboardSports.add_first') : p.t('DashboardSports.add_another')}</span>
          {/* <span className="cl-noteMsg">{p.t('DashboardSports.note')}</span>
          {renderAllPage(appConstants.RegistrationFlowPageStatusFlags.disabled, p.t, appConstants.defaultOfferTerminology)} */}
        </a>

        {
          isFirstSport === false &&
          <div className="cl-bottom-row">
            <a className="cl-sd-align-middle" onClick={this.handleSampleModal}>{ p.t('DashboardSports.view_a_sample') }</a>
          </div>
        }
      </div>
    );
  }

  handleSampleModal() {
    const {isModalOpen} = this.state;
    this.setState({isModalOpen: !isModalOpen});
  }

  render() {
    const {serviceProfiles} = this.props;
    const {isModalOpen} = this.state;
    return (
      <div className="dashboardSection">
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
            <h1 className="uk-padding-remove">{this.props.p.t('DashboardSports.h1')}</h1>
            <p className="pb35">{this.props.p.t('DashboardSports.p')}</p>
            <div className="cl-sd-addProfileOuter">
              {this.renderSports(serviceProfiles)}
              {this.renderAddAnotherButton()}
              {this.renderSample()}
            </div>
          </div>
        </div>
        <ExampleModal title="ExampleModal.sampleISPProfile" isModalOpen={isModalOpen} scroll={appConstants.scroll.profile} image={SAMPLE_PROFILE} onClose={this.handleSampleModal}/>
      </div>
    );
  }

  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      history: PropTypes.object.isRequired,
      clearSportsRelatedStores: PropTypes.func.isRequired,
      serviceProfiles: PropTypes.object.isRequired,
      ispFetchServiceProfiles: PropTypes.func.isRequired,
      profile: PropTypes.object.isRequired,
      sessions: PropTypes.object.isRequired,
      userProfiles: PropTypes.object.isRequired,
      currentSport: PropTypes.object.isRequired,
      workingDays: PropTypes.object.isRequired,
      isProfileActive: PropTypes.bool.isRequired,
      ispFetchWorkingDays: PropTypes.func.isRequired,
      fetchScheduledSessions: PropTypes.object.isRequired,
      scheduledSessions: PropTypes.object.isRequired
    };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearSportsRelatedStores: () => dispatch(clearSportsRelatedStores()),
    ispFetchServiceProfiles: profileID => dispatch(ispFetchServiceProfiles(profileID)),
    ispFetchWorkingDays: params => dispatch(ispFetchWorkingDays(params)),
    fetchScheduledSessions: (profileId, dateString) => dispatch(fetchScheduledSessions(profileId, dateString))
  };
};

const mapStateToProps = state => {
  const {serviceProfiles, profile, workingDays, userProfiles, currentSport, sessions, scheduledSessions} = state;
  return {
    serviceProfiles,
    profile,
    workingDays,
    isProfileActive: userProfiles.selectedProfile.isActive === appConstants.profileActiveFlages.isActive,
    currentSport,
    userProfiles,
    sessions,
    scheduledSessions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(translate(DashboardSports)));
/* eslint react/no-deprecated: 0 */
