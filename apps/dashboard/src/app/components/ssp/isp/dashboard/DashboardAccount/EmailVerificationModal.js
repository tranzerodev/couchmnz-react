
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import Modal from '../../../../common/Modal';
import appConstants from '../../../../../constants/appConstants';
import {verifyEmailOTP, verifyEmail} from '../../../../../actions/index';
import {REJECTED, FULFILLED} from '../../../../../constants/ActionTypes';

class BusinessEmailVerificationModal extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleResend = this.handleResend.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getErrorClass = this.getErrorClass.bind(this);

    this.state = {
      submitted: false,
      code: '',
      code2: '',
      validCode: false,
      validCode2: false
    };
  }

  componentWillReceiveProps(nextProp) {
    const {emailVerificationStatus, email2} = nextProp;
    if (emailVerificationStatus.status === FULFILLED && emailVerificationStatus.data.email === email2) {
      this.props.onClose();
    }
  }

  handleChange(e) {
    this.setState({code: e.target.value});
    if (e.target.value.length === appConstants.paypalEmailVerificationCodeLength) {
      this.setState({validCode: true});
    } else {
      this.setState({validCode: false});
    }
  }

  handleChange2(e) {
    this.setState({code2: e.target.value});
    if (e.target.value.length === appConstants.paypalEmailVerificationCodeLength) {
      this.setState({validCode2: true});
    } else {
      this.setState({validCode2: false});
    }
  }

  handleResend() {
    const {email2, profileId} = this.props;
    this.props.verifyEmail({profileId}, {email: email2});
  }

  handleSubmit() {
    const {email2, profileId} = this.props;
    this.setState({submitted: true});
    if (this.state.validCode && this.state.validCode2) {
      this.props.verifyEmailOTP({profileId}, {
        email: email2,
        oldEmailPin: this.state.code,
        newEmailPin: this.state.code2
      });
    }
  }

  getErrorClass() {
    return (this.state.submitted && !this.state.validCode) || (this.props.emailVerificationStatus.status === REJECTED) ?
      'field-holder error' : 'field-holder';
  }

  render() {
    const {isModalOpen, p, email, email2} = this.props;
    const {t} = p;
    return (
      <Modal isModalOpen={isModalOpen}>
        <div id="verifyEmailModal" >
          <div className="uk-modal-dialog uk-modal-dialog-small">
            <div className="uk-modal-header">
              <h1>{t('BusinessEmailVerificationModal.verify_email')}</h1>
              <a onClick={this.props.onClose} className="del uk-modal-close">
                <svg className="cl-icon-cross-blue-big" xmlns="http://www.w3.org/2000/svg" viewBox="-317.53 -5232.53 19.061 19.061">
                  <g transform="translate(-1946.5 -5770.5)">
                    <line data-name="Line 230" className="cl-icon-cross-blue-big-1" x2="18" y2="18" transform="translate(1629.5 538.5)"/>
                    <line data-name="Line 231" className="cl-icon-cross-blue-big-1" x1="18" y2="18" transform="translate(1629.5 538.5)"/>
                  </g>
                </svg>
              </a>
            </div>
            <div className="uk-modal-body">
              <div className="uk-grid">
                <div className="uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
                  <p>{t('BusinessEmailVerificationModal.p')}</p>
                  <p>{t('BusinessEmailVerificationModal.p1', {emailId: email, emailId2: email2})}</p>
                  <p>{t('BusinessEmailVerificationModal.p2')}</p>
                </div>
                <div className={this.getErrorClass()}>
                  <span className="error-text">{this.state.submitted && this.props.emailVerificationStatus.status === REJECTED && this.props.emailVerificationStatus.data.message === 'exists' ? t('BusinessEmailVerificationModal.validation_message.exists', {email: email2}) : ''}</span>
                </div>
              </div>
              <div className="uk-grid">
                <div className="uk-width-large-1-2 uk-width-medium-1-1 uk-width-small-1-1">
                  <div className={this.getErrorClass()}>
                    <p>{t('BusinessEmailVerificationModal.currentEmail', {email})}</p>
                    <input onChange={this.handleChange} name="" placeholder={t('BusinessEmailVerificationModal.placeholder', {digit: appConstants.emailOTPLength})}/>
                    {
                      this.props.emailVerificationStatus.data && this.props.emailVerificationStatus.data.message !== 'exists' && (
                        <span className="error-text">{this.state.submitted && !this.state.validCode ?
                          t('BusinessEmailVerificationModal.validation_message.code_length') :
                          t('BusinessEmailVerificationModal.validation_message.match')}
                        </span>
                      )
                    }
                  </div>
                </div>
              </div>
              <div className="uk-grid">
                <div className="uk-width-large-1-2 uk-width-medium-1-1 uk-width-small-1-1">
                  <div className={this.getErrorClass()}>
                    <p>{t('BusinessEmailVerificationModal.newEmail', {email: email2})}</p>
                    <input onChange={this.handleChange2} name="" placeholder={t('BusinessEmailVerificationModal.placeholder', {digit: appConstants.emailOTPLength})}/>
                    {
                      this.props.emailVerificationStatus.data && this.props.emailVerificationStatus.data.message !== 'exists' && (
                        <span className="error-text">{this.state.submitted && !this.state.validCode2 && this.props.emailVerificationStatus.data && this.props.emailVerificationStatus.data.message !== 'exists' ?
                          t('BusinessEmailVerificationModal.validation_message.code_length') :
                          t('BusinessEmailVerificationModal.validation_message.match')}
                        </span>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="uk-modal-footer">
              <div className="tableDiv">
                <div className="lCol">
                  <a onClick={this.handleSubmit} className="general_btn">{t('BusinessEmailVerificationModal.ok')}</a>
                  <a onClick={this.handleResend} className="link">{t('BusinessEmailVerificationModal.resend')}</a>
                </div>
                <div className="rCol">
                  <a onClick={this.props.onClose} className="cancel">{t('BusinessEmailVerificationModal.cancel')}</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Modal>
    );
  }

  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      onClose: PropTypes.func.isRequired,
      isModalOpen: PropTypes.bool.isRequired,
      email: PropTypes.string.isRequired,
      email2: PropTypes.string.isRequired,
      verifyEmail: PropTypes.func.isRequired,
      verifyEmailOTP: PropTypes.func.isRequired,
      profileId: PropTypes.string.isRequired,
      emailVerificationStatus: PropTypes.object.isRequired
    };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    verifyEmail: (params, data) => dispatch(verifyEmail(params, data)),
    verifyEmailOTP: (params, data) => dispatch(verifyEmailOTP(params, data))
  };
};

const mapStateToProps = state => {
  const {userProfiles, emailVerificationStatus} = state;
  return {
    profileId: userProfiles.selectedProfile.id,
    emailVerificationStatus
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(translate(BusinessEmailVerificationModal)));
