import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
/* eslint react/no-array-index-key: 0 */
import {connect} from 'react-redux';
import {REJECTED, PENDING} from '../../../../../constants/ActionTypes';
import {ClipLoader} from 'react-spinners';
import VerifyEmailModal from '../../common/VerifyEmailModal';
import CommonModal from '../../../../common/Modal';

import {
  postProfile,
  changeUpdateProfileStatus,
  verifyPaypalEmail,
  postCurrentSport
} from '../../../../../actions';
class PaypalSaveButton extends Component {
  constructor() {
    super();
    this.handleSave = this.handleSave.bind(this);

    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.onCloseVerifyModal = this.onCloseVerifyModal.bind(this);
    this.onCloseCongratsModal = this.onCloseCongratsModal.bind(this);
    this.state = {
      modal: <div/>,
      isOpenVerifyModal: false,
      isOpenCongratsModal: false
    };
  }
  handleSave() {
    this.props.submitForm({status: true});
    if (this.props.valid) {
      if (this.props.paypalDetails.email === this.props.paypalVerification.data.email || this.props.paypalDetails.email === this.props.profile.data.profile.email) {
        // This.props.postProfile(this.props.profile.data, {profileID: this.props.userIDs.data.coachIDs[0]});
        this.props.postProfile(this.props.profile.data, {profileID: this.props.userProfiles.selectedProfile.id});
        // This.props.postCurrentSport(this.props.currentSport.data, {profileID: this.props.userIDs.data.coachIDs[0], sportID: this.props.sport.id});
      } else {
        this.props.verifyPaypalEmail({profileID: this.props.profile.data.profile.id}, {email: this.props.paypalDetails.email});
        this.setState({isOpenVerifyModal: true});
      }
    }
  }

  handleCloseModal() {
    this.setState({modal: <div/>});
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
  }
  render() {
    return (
      <div>
        {this.state.modal}
        <div className="uk-grid">
          <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-2  uk-width-small-1-1">
            <a className="general_btn" onClick={this.handleSave}>{this.props.p.t('SaveButton.save')}</a>
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
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      valid: PropTypes.bool,
      submitForm: PropTypes.func.isRequired,
      postProfile: PropTypes.func.isRequired,
      // UserIDs: PropTypes.object.isRequired,
      userProfiles: PropTypes.object.isRequired,
      profileUpdateStatus: PropTypes.object,
      profile: PropTypes.object,
      // ChangeUpdateProfileStatus: PropTypes.func.isRequired,
      paypalVerification: PropTypes.object.isRequired,
      paypalDetails: PropTypes.object.isRequired,
      verifyPaypalEmail: PropTypes.func.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {profile, userIDs, userProfiles, profileUpdateStatus, paypalVerification, paypalDetails, sport} = state;
  return {
    profile,
    userIDs,
    userProfiles,
    profileUpdateStatus,
    paypalVerification,
    paypalDetails,
    sport
  };
};
const mapDispatchToProps = dispatch => {
  return {
    postProfile: (data, params) => dispatch(postProfile(data, params)),
    changeUpdateProfileStatus: status => dispatch(changeUpdateProfileStatus(status)),
    verifyPaypalEmail: (params, data) => dispatch(verifyPaypalEmail(params, data)),
    postCurrentSport: (data, params) => dispatch(postCurrentSport(data, params))
  };
};
PaypalSaveButton.defaultProps = {
  valid: false,
  profileUpdateStatus: {
    status: null
  },
  profile: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(translate(PaypalSaveButton));
