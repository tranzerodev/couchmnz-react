import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
/* eslint react/no-array-index-key: 0 */
import {connect} from 'react-redux';
import {REJECTED, FULFILLED, PENDING} from '../../../../../constants/ActionTypes';
import Modal from '../ISPRegFlowStepFooter/Modal';
import {ClipLoader} from 'react-spinners';
import VerifyEmailModal from './../../common/VerifyEmailModal';
import CommonModal from '../../../../common/Modal';
import RegCompleteModal from '../RegCompleteModal';
import appConstants from '../../../../../constants/appConstants';

import {
  changeUpdateProfileStatus,
  verifyPaypalEmail,
  postCurrentSport,
  fetchProfile,
  activateNewProfile
} from '../../../../../actions';
import {DASHBOARD} from '../../../../../constants/pathConstants';
class PaypalNextButton extends Component {
  constructor() {
    super();
    this.handleNext = this.handleNext.bind(this);
    this.handleFinishLater = this.handleFinishLater.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.onCloseVerifyModal = this.onCloseVerifyModal.bind(this);
    this.onCloseCongratsModal = this.onCloseCongratsModal.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
    this.state = {
      modal: <div/>,
      isOpenVerifyModal: false,
      isOpenCongratsModal: false,
      posted: false,
      verificationRequetSent: false
    };
  }
  handleNext() {
    this.props.submitForm({status: true});
    if (this.props.valid) {
      if (this.props.paypalDetails.email === this.props.paypalVerification.data.email || this.props.paypalDetails.email === this.props.profile.data.profile.email) {
        // This.props.history.push(this.props.next);
        this.props.activateNewProfile({profileID: this.props.userProfiles.selectedProfile.id});
        // This.props.activateNewProfile({profileID: this.props.userIDs.data.coachIDs[0]});
        this.setState({posted: true, isOpenCongratsModal: true});
      } else {
        this.props.verifyPaypalEmail({profileID: this.props.profile.data.profile.id}, {email: this.props.paypalDetails.email});
        this.setState({isOpenVerifyModal: true, verificationRequetSent: true});
      }
    }
  }
  handleFinish() {
    this.setState({
      isOpenCongratsModal: false
    });
    const {profile, profileActivationStatus} = this.props;
    if (profileActivationStatus.status === FULFILLED && profile && profile.data && profile.data.profile && profile.data.profile.isActive === 'Y') {
      this.props.history.push(this.props.next);
    }
  }
  handleFinishLater() {
    this.setState({modal: <Modal handleCloseModal={this.handleCloseModal} valid={this.props.valid} handleNext={this.handleNext} submitForm={this.props.submitForm}/>});
  }
  handleCloseModal() {
    this.setState({modal: <div/>});
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profileActivationStatus.status === FULFILLED && this.state.postSubmitted) {
      this.setState({postSubmitted: false});
      // This.props.history.push(this.props.next);
    }
    if (nextProps.profileUpdateStatus.status === FULFILLED && this.state.posted) {
      this.setState({posted: false});
      this.props.changeUpdateProfileStatus(null);
      if (this.props.next === DASHBOARD && this.props.profile.data.profile.isActive === appConstants.profileActiveStatus.ACTIVE) {
        this.setState({isOpenCongratsModal: true});
      } else {
        // This.props.history.push(this.props.next);
      }
    }
    if (this.props.paypalVerification.status === FULFILLED && this.state.verificationRequetSent) {
      this.setState({verificationRequetSent: false});
      this.props.fetchProfile({profileID: this.props.profile.data.profile.id});
    }
  }
  onCloseVerifyModal() {
    this.setState({
      isOpenVerifyModal: false
    });
  }
  onCloseCongratsModal() {
    this.setState({
      isOpenCongratsModal: false
    });
    this.props.history.push(this.props.next);
  }
  render() {
    return (
      <div>
        {this.state.modal}
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-2"/>
          <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-2 uk-text-right">
            <a className="general_btn" onClick={this.handleNext}>{this.props.p.t('ISPRegFlowStepFooter.next')}</a>
          </div>
          <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-1 ">
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
        <CommonModal isModalOpen={this.state.isOpenVerifyModal}>
          <VerifyEmailModal handleClose={this.onCloseVerifyModal} handleVerificationSuccess={this.onVerificationSuccess}/>
        </CommonModal>
        <CommonModal isModalOpen={this.state.isOpenCongratsModal} >
          <RegCompleteModal handleClose={this.handleFinish}/>
        </CommonModal>
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
      // UserIDs: PropTypes.object.isRequired,
      userProfiles: PropTypes.object.isRequired,
      profileActivationStatus: PropTypes.object.isRequired,
      activateNewProfile: PropTypes.func.isRequired,
      profileUpdateStatus: PropTypes.object,
      profile: PropTypes.object,
      changeUpdateProfileStatus: PropTypes.func.isRequired,
      paypalVerification: PropTypes.object.isRequired,
      paypalDetails: PropTypes.object.isRequired,
      verifyPaypalEmail: PropTypes.func.isRequired,
      fetchProfile: PropTypes.func.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {profile, userIDs, userProfiles, profileUpdateStatus, paypalVerification, profileActivationStatus, paypalDetails, sport} = state;
  return {
    profile,
    userIDs,
    userProfiles,
    profileUpdateStatus,
    paypalVerification,
    profileActivationStatus,
    paypalDetails,
    sport
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeUpdateProfileStatus: status => dispatch(changeUpdateProfileStatus(status)),
    verifyPaypalEmail: (params, data) => dispatch(verifyPaypalEmail(params, data)),
    postCurrentSport: (data, params) => dispatch(postCurrentSport(data, params)),
    fetchProfile: params => dispatch(fetchProfile(params)),
    activateNewProfile: (data, params) => dispatch(activateNewProfile(data, params))
  };
};
PaypalNextButton.defaultProps = {
  valid: false,
  next: '/',
  profileUpdateStatus: {
    status: null
  },
  profile: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(translate(PaypalNextButton));
