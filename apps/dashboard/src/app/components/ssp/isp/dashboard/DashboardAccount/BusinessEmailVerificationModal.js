
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import Modal from '../../../../common/Modal';
import appConstants from '../../../../../constants/appConstants';
import {verifyBusinessEmailOTP, verifyBusinessEmail} from '../../../../../actions/index';
import {REJECTED, FULFILLED} from '../../../../../constants/ActionTypes';

class BusinessEmailVerificationModal extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleResend = this.handleResend.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getErrorClass = this.getErrorClass.bind(this);

    this.state = {
      submitted: false,
      code: '',
      validCode: false
    };
  }

  componentWillReceiveProps(nextProp) {
    const {businessEmailVerificationStatus, email} = nextProp;
    if (businessEmailVerificationStatus.status === FULFILLED && businessEmailVerificationStatus.data.email === email) {
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

  handleResend() {
    const {email, profileId} = this.props;
    this.props.verifyBusinessEmail({profileId}, {email});
  }

  handleSubmit() {
    const {email, profileId} = this.props;
    this.setState({submitted: true});
    if (this.state.validCode) {
      this.props.verifyBusinessEmailOTP({profileId}, {
        email,
        pin: this.state.code
      });
    }
  }

  getErrorClass() {
    return (this.state.submitted && !this.state.validCode) || (this.props.businessEmailVerificationStatus.status === REJECTED) ?
      'field-holder error' : 'field-holder';
  }

  render() {
    const {isModalOpen, p} = this.props;
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
                  <p>{t('BusinessEmailVerificationModal.p1')}</p>
                  <p>{t('BusinessEmailVerificationModal.p2')}</p>
                </div>
              </div>
              <div className="uk-grid">
                <div className="uk-width-large-1-2 uk-width-medium-1-1 uk-width-small-1-1">
                  <div className={this.getErrorClass()}>
                    <input onChange={this.handleChange} name="" placeholder={t('BusinessEmailVerificationModal.placeholder', {digit: appConstants.businessEmailOTPLength})}/>
                    <span className="error-text">{this.state.submitted && !this.state.validCode ?
                      t('BusinessEmailVerificationModal.validation_message.code_length') :
                      t('BusinessEmailVerificationModal.validation_message.match')}
                    </span>
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
      verifyBusinessEmail: PropTypes.func.isRequired,
      verifyBusinessEmailOTP: PropTypes.func.isRequired,
      profileId: PropTypes.string.isRequired,
      businessEmailVerificationStatus: PropTypes.object.isRequired
    };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    verifyBusinessEmail: (params, data) => dispatch(verifyBusinessEmail(params, data)),
    verifyBusinessEmailOTP: (params, data) => dispatch(verifyBusinessEmailOTP(params, data))
  };
};

const mapStateToProps = state => {
  const {userProfiles, businessEmailVerificationStatus} = state;
  return {
    profileId: userProfiles.selectedProfile.id,
    businessEmailVerificationStatus
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(translate(BusinessEmailVerificationModal)));
