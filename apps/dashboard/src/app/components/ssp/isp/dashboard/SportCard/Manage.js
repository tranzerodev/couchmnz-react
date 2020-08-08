import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import {DASHBOARD_MANAGE_SPORT_TRAINING_PREFERENCES} from '../../../../../constants/pathConstants';
import appConstants from '../../../../../constants/appConstants';
import {
  changeCurrentSport,
  activateSport,
  deactivateSport,
  fetchCurrentSport,
  activateNewProfile
} from '../../../../../actions';
import {parseUrlTemplate} from '../../../../../utils/urlHelper';
import {VIEW_SSP_PROFILE_SPORT} from '../../../../../constants/WebConstants';
import {isNonEmptyArray} from '../../../../../validators/common/util';
import {FULFILLED, PENDING} from '../../../../../constants/ActionTypes';
import {isFirstSport} from '../../../../../validators/ssp/isp/common/isFirstSport';

class ManageSport extends Component {
  constructor(props) {
    super(props);
    this.handleManage = this.handleManage.bind(this);
    this.handleActivateSport = this.handleActivateSport.bind(this);
    this.handleDeactive = this.handleDeactive.bind(this);
    this.getSportsCompletionStatus = this.getSportsCompletionStatus.bind(this);
    this.handleFirstSportActivation = this.handleFirstSportActivation.bind(this);
    this.getScheduleSessionStatus = this.getScheduleSessionStatus.bind(this);
  }

  componentDidUpdate(preProps) {
    const {sportsActivation} = this.props;
    if (preProps.sportsActivation.status === PENDING && sportsActivation.status === FULFILLED) {
      const isFirstActivation = isFirstSport(preProps.serviceProfiles.data);
      console.log('preProps.serviceProfiles.data', preProps.serviceProfiles.data, isFirstSport(preProps.serviceProfiles.data), 'isFirstSport(serviceProfiles.data)');
      if (isFirstActivation) {
        this.handleFirstSportActivation();
      }
    }
  }

  handleManage() {
    const {selectedProfile, sport, history} = this.props;
    this.props.fetchCurrentSport({profileID: selectedProfile.id, sportID: sport.sportId});
    history.push(DASHBOARD_MANAGE_SPORT_TRAINING_PREFERENCES);
  }

  handleActivateSport() {
    const {sport, selectedProfile, activateSport} = this.props;
    if (sport) {
      activateSport(selectedProfile.id, sport.sportId);
    }
    // If (selectedProfile.isActive === appConstants.profileActiveFlages.inactive && isProfileCompletd) {
    //   this.props.activateNewProfile({profileID: selectedProfile.id});
    // }
  }

  handleDeactive() {
    const {selectedProfile, sport} = this.props;
    this.props.deactivateSport(selectedProfile.id, sport.sportId);
  }

  getSportsCompletionStatus() {
    const {sport, selectedProfile, isProfileCompletd} = this.props;
console.log('isProfileComplete', isProfileCompletd)
    const {intermediate, disabled} = appConstants.RegistrationFlowPageStatusFlags;
    const {sectionStatus} = sport;
    console.log('sectionStatus', sectionStatus)
    const pages = Object.keys(sectionStatus).map(key => {
      if ( key == 'SCHEDULES' || key == 'DYNAMIC_SESSION' ) {
        return 'Y'
      } else {
        return sectionStatus[key];
      }
    });
    
    const sportCompletion = pages.indexOf(disabled) === -1 && pages.indexOf(intermediate) === -1;
    console.log('pages', pages)
    console.log('sportCompletion', sportCompletion)
    const isProfileActive = selectedProfile.isActive === appConstants.profileActiveFlages.active;
    if (isProfileActive || isProfileCompletd) {
      return sportCompletion;
    }
    return false;
  }

  handleFirstSportActivation() {
    const {profile, currentSport} = this.props;
    console.log('Handle Activation');
    const {nickName} = profile.data.profile;
    const sportID = currentSport.data.id;
    const url = parseUrlTemplate(VIEW_SSP_PROFILE_SPORT, {nickName, sportID});
    window.open(url, '_self');
  }

  getScheduleSessionStatus() {
    const {serviceProfiles, scheduledSessions} = this.props;
    if (isFirstSport(serviceProfiles.data)) {
      return Boolean(scheduledSessions.status === FULFILLED &&
        (isNonEmptyArray(scheduledSessions.data) ||
        isNonEmptyArray(scheduledSessions.upcomming)));
    }
    return true;
  }

  render() {
    const {sport, p, presentNickName} = this.props;
    const isActiveSport = (sport.isActive === appConstants.sportsActiveFlages.active);
    const isSportComplete = this.getSportsCompletionStatus(); // && this.getScheduleSessionStatus();
    const coachUrl = parseUrlTemplate(VIEW_SSP_PROFILE_SPORT, {nickName: presentNickName.nickname, sportID: sport.sportId});
    console.log('isProfileCompletd', isSportComplete)
    return (
      <div className="cl-bottom-row">
        {isActiveSport &&
          <a href={coachUrl} className="cl-sd-align-left">{p.t('ManageSport.view_profile')}</a>
        }
        { (isActiveSport || isSportComplete) &&
          <a onClick={this.handleManage} className="cl-sd-align-left">{p.t('ManageSport.edit')}</a>
        }
        {
          isActiveSport ?
            <a onClick={this.handleDeactive} className="cl-sd-align-right">{p.t('ManageSport.deactivate')}</a> :
            isSportComplete ?
              <a onClick={this.handleActivateSport} className="cl-sd-align-right">{p.t('ManageSport.activate')}</a> :
              ''
        }
        {isSportComplete === false &&
          <a onClick={this.handleManage} className="cl-sd-align-middle">{p.t('ManageSport.complete_sport', {sportName: sport.sportName})}</a>
        }
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      sport: PropTypes.object.isRequired,
      changeCurrentSport: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired,
      selectedProfile: PropTypes.object.isRequired,
      activateSport: PropTypes.func.isRequired,
      deactivateSport: PropTypes.func.isRequired,
      fetchCurrentSport: PropTypes.func.isRequired,
      isProfileCompletd: PropTypes.bool.isRequired,
      presentNickName: PropTypes.object.isRequired,
      profile: PropTypes.object.isRequired,
      currentSport: PropTypes.object.isRequired,
      scheduledSessions: PropTypes.object.isRequired,
      serviceProfiles: PropTypes.object.isRequired,
      sportsActivation: PropTypes.object.isRequired
    };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeCurrentSport: sportID => dispatch(changeCurrentSport(sportID)),
    activateSport: (profileId, sportID) => dispatch(activateSport(profileId, sportID)),
    deactivateSport: (profileId, sportId) => dispatch(deactivateSport(profileId, sportId)),
    fetchCurrentSport: profileID => dispatch(fetchCurrentSport(profileID)),
    activateNewProfile: (data, params) => dispatch(activateNewProfile(data, params))
  };
};

const mapStateToProps = state => {
  const {userProfiles, presentNickName, scheduledSessions, profile, currentSport, serviceProfiles, sportsActivation} = state;
  return {
    selectedProfile: userProfiles.selectedProfile,
    presentNickName,
    scheduledSessions,
    profile,
    currentSport,
    serviceProfiles,
    sportsActivation
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(translate(ManageSport)));
