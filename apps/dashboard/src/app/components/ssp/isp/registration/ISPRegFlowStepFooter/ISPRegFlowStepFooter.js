import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {ClipLoader} from 'react-spinners';
import {connect} from 'react-redux';

import {REJECTED, FULFILLED, PENDING} from '../../../../../constants/ActionTypes';
import Modal from './Modal';

import CommonModal from '../../../../common/Modal';
import BiograNotFilledModal from '../../registration/BiographyNotFilledModal';
import {
  postProfile,
  changeUpdateProfileStatus,
  changeUpdateSportStatus,
  postCurrentSport
} from '../../../../../actions';
import {logout} from '../../../../../../auth/auth';
import {ISP_REG_FLOW_BIOGRAPHY} from '../../../../../constants/pathConstants';
import RegCompleteModal from '../RegCompleteModal';

/* eslint react/no-array-index-key: 0 */
class ISPRegFlowStepFooter extends Component {
  constructor() {
    super();
    this.handleNext = this.handleNext.bind(this);
    this.handleFinishLater = this.handleFinishLater.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.onCloseCongratsModal = this.onCloseCongratsModal.bind(this);
    this.onBiographyNotFilledModalClose = this.onBiographyNotFilledModalClose.bind(this);
    this.onBiographyContinue = this.onBiographyContinue.bind(this);
    this.state = {
      logout: false,
      modal: <div/>,
      isOpenCongratsModal: false,
      isBiographyNotFilledModalOpen: false,
      isCurrentSportUpdated: false
    };
  }
  handleNext(logoutStatus) {
    if (this.props.location.pathname === ISP_REG_FLOW_BIOGRAPHY && logoutStatus !== true) {
      this.setState({isBiographyNotFilledModalOpen: true});
    } else {
      this.setState({logoutStatus});
      this.props.submitForm({status: true});
      if (this.props.valid) {
        const {userProfiles, currentSport} = this.props;
        const profileID = userProfiles.selectedProfile.id;
        const sportID = currentSport.data.id;
        if (this.props.submit === 'sport') {
          // This.props.postCurrentSport(this.props.currentSport.data, {profileID: this.props.userIDs.data.coachIDs[0], sportID: this.props.sport.id});
          this.props.postCurrentSport(this.props.currentSport.data, {profileID, sportID});
          this.setState({
            isCurrentSportUpdated: true
          });
        } else if (this.props.submit === 'profile') {
          this.props.postProfile(this.props.profile.data, {profileID});
        } else if (this.props.submit === 'all') {
          this.props.postProfile(this.props.profile.data, {profileID});
          this.props.postCurrentSport(this.props.currentSport.data, {profileID, sportID});
          this.setState({
            isCurrentSportUpdated: true
          });
        }
      // This.props.postCurrentSport(this.props.currentSport.data, {profileID: this.props.userIDs.data.coachIDs[0], sportID: this.props.sport.id});
      } else if (logoutStatus === true) {
        logout();
      }
    }
  }
  handleFinishLater() {
    this.setState({modal: <Modal handleCloseModal={this.handleCloseModal} valid={this.props.valid} handleNext={this.handleNext} submitForm={this.props.submitForm}/>});
  }
  handleCloseModal() {
    this.setState({modal: <div/>});
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.submit === 'all') {
      if (nextProps.sportUpdateStatus.status === FULFILLED && nextProps.profileUpdateStatus.status === FULFILLED && this.state.isCurrentSportUpdated) {
        this.setState({
          isCurrentSportUpdated: false
        });
        this.props.history.push(this.props.next);
      }
    }
    if (this.props.submit === 'sport') {
      if (nextProps.sportUpdateStatus.status === FULFILLED && this.state.isCurrentSportUpdated) {
        this.setState({
          isCurrentSportUpdated: false
        });
        this.props.history.push(this.props.next);
      }
    }
    if (this.props.submit === 'profile') {
      if (nextProps.profile.status === FULFILLED && this.state.isCurrentSportUpdated) {
        this.setState({
          isCurrentSportUpdated: false
        });
        this.props.history.push(this.props.next);
      }
    }
  }
  onCloseCongratsModal() {
    this.setState({
      isOpenCongratsModal: false
    });
    this.props.history.push(this.props.next);
  }
  onBiographyNotFilledModalClose() {
    this.setState({isBiographyNotFilledModalOpen: false});
  }
  onBiographyContinue() {
    this.props.submitForm({status: true});
    if (this.props.valid) {
      const {userProfiles, currentSport} = this.props;
      const profileID = userProfiles.selectedProfile.id;
      const sportID = currentSport.data.id;
      this.props.postProfile(this.props.profile.data, {profileID});
      this.props.postCurrentSport(this.props.currentSport.data, {profileID, sportID});
      this.setState({
        isCurrentSportUpdated: true
      });
    }
  }
  render() {
    return (
      <div>
        {this.state.modal}
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-4 uk-width-large-1-3 uk-width-medium-1-3  uk-width-small-1-2"/>
          <div className="uk-width-xlarge-2-4 uk-width-large-1-3 uk-width-medium-1-3  uk-width-small-1-2 ">
            <a className="general_btn" onClick={this.handleNext}>{this.props.p.t('ISPRegFlowStepFooter.next')}</a>
          </div>
          <div className="uk-width-xlarge-1-4 uk-width-large-1-3 uk-width-medium-1-3  uk-width-small-1-1 ">
            <div className="finishDiv">
              <a className="finish" onClick={this.handleFinishLater}>{this.props.p.t('ISPRegFlowStepFooter.orFinishLater')}</a>
            </div>
          </div>
        </div>
        {this.props.profileUpdateStatus.status === REJECTED &&
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
              <div className="gen_error">
                <div className="tableDiv">
                  <div className="lCol">
                    <i className="fa fa-exclamation-triangle" aria-hidden="true"/>
                  </div>
                  <div className="rCol">
                    <p>{this.props.p.t('SaveButton.error_message')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        <div className={this.props.profileUpdateStatus.status === PENDING ? 'overlayLoader' : ''}>
          <ClipLoader loading={this.props.profileUpdateStatus.status === PENDING} size={30}/>
        </div>
        <CommonModal isModalOpen={this.state.isOpenCongratsModal} >
          <RegCompleteModal handleClose={this.onCloseCongratsModal}/>
        </CommonModal>
        <BiograNotFilledModal isModalOpen={this.state.isBiographyNotFilledModalOpen} handleClose={this.onBiographyNotFilledModalClose} handleContinue={this.onBiographyContinue}/>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      valid: PropTypes.bool,
      submitForm: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired,
      next: PropTypes.string,
      postProfile: PropTypes.func.isRequired,
      // UserIDs: PropTypes.object.isRequired,
      userProfiles: PropTypes.object.isRequired,
      currentSport: PropTypes.object.isRequired,
      sportUpdateStatus: PropTypes.object.isRequired,
      postCurrentSport: PropTypes.func.isRequired,
      submit: PropTypes.string.isRequired,
      profileUpdateStatus: PropTypes.object,
      profile: PropTypes.object,
      location: PropTypes.object.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {profile, userIDs, userProfiles, profileUpdateStatus, sportUpdateStatus, sport, currentSport} = state;
  return {
    profile,
    userIDs,
    userProfiles,
    profileUpdateStatus,
    sportUpdateStatus,
    sport,
    currentSport
  };
};
const mapDispatchToProps = dispatch => {
  return {
    postProfile: (data, params) => dispatch(postProfile(data, params)),
    postCurrentSport: (data, params) => dispatch(postCurrentSport(data, params)),
    changeUpdateProfileStatus: status => dispatch(changeUpdateProfileStatus(status)),
    changeUpdateSportStatus: status => dispatch(changeUpdateSportStatus(status))
  };
};
ISPRegFlowStepFooter.defaultProps = {
  valid: false,
  next: '/',
  profileUpdateStatus: {
    status: null
  },
  profile: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(translate(ISPRegFlowStepFooter));
