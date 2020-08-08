import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import appConstants from '../../../constants/appConstants';
import validateOTP from '../../../validators/common/otpVerify';
import {verifyOTP, resendEmailVerificationOTP} from '../../../actions/index';
import {REJECTED, PENDING, FULFILLED} from '../../../constants/ActionTypes';
import Footer from '../../Footer';
import config from '../../../config';
import {setupShortRegistrationFlow} from '../../../utils/registration';

const {auth} = appConstants;

class VerifyOTP extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResend = this.handleResend.bind(this);
    this.renderValidationMessage = this.renderValidationMessage.bind(this);

    this.state = {
      otp: '',
      validation: {
        required: false,
        valid: false
      },
      submit: false
    };
  }

  componentDidUpdate(preProps) {
    const {otpVerificationStatus} = preProps;
    if (otpVerificationStatus === PENDING && this.props.otpVerificationStatus === FULFILLED) {
      this.props.history.push('/');
      setupShortRegistrationFlow();
      window.open(config.dashboardUrl, '_self');
    }
  }

  handleChange(e) {
    const otp = e.target.value;
    const validation = validateOTP(otp);
    this.setState({otp, validation});
  }

  handleSubmit() {
    const {validation, otp} = this.state;
    if (validation.valid && validation.required) {
      this.props.verifyOTP({pin: otp, email: this.props.email});
    }
    this.setState({submit: true});
  }

  handleResend() {
    const {email} = this.props;
    this.props.resendEmailVerificationOTP({email});
  }

  renderValidationMessage(validation) {
    const {p, otpVerificationStatus} = this.props;
    const {t} = p;
    return validation.required === false ? t('VerifyOTP.validation_messages.required') :
      validation.valid === false ? t('VerifyOTP.validation_messages.code_length') :
        otpVerificationStatus === REJECTED ? t('VerifyOTP.validation_messages.match') : null;
  }

  render() {
    const {p, email, otpVerificationStatus} = this.props;
    const {t} = p;
    const {otp, validation, submit} = this.state;
    return (
      <div>
        <section className="stepSection signUpTwo stepSection1-2">
          <div className="uk-container uk-container-center">
            <div className="uk-grid">
              <div className="uk-width-large-6-10 uk-width-medium-4-10"/>
              <div className="uk-width-large-4-10 uk-width-medium-6-10 uk-width-small-1-1">
                <div className="verifyAcc">
                  <h1>{t('VerifyOTP.verify_account')}</h1>
                  <p>{t('VerifyOTP.p1')}  <strong>{email}</strong></p>
                  <p> {t('VerifyOTP.p2')} </p>
                  <div
                    className={submit &&
                    (validation.valid === false || validation.required === false || otpVerificationStatus === REJECTED) ?
                      'field-holder error' : 'field-holder'}
                  >
                    <input onChange={this.handleChange} value={otp} type="text" className="field-required" name="" placeholder={t('VerifyOTP.otpPlaceHolder', {digit: auth.otpCodeLength})}/>
                    <span className="error-text">{this.renderValidationMessage(validation)}</span>
                    <div id="error-nwl2"/>
                  </div>
                  <button onClick={this.handleSubmit} className="general_btn">{t('VerifyOTP.submit')}</button>
                  <div className="borderClass pbmb"/>
                  <p> {t('VerifyOTP.p3')}  <a onClick={this.handleResend}>{t('VerifyOTP.resend')}</a>{t('VerifyOTP.or')}  <a>{t('VerifyOTP.contact')}</a></p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer/>
      </div>
    );
  }

  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      email: PropTypes.string.isRequired,
      verifyOTP: PropTypes.func.isRequired,
      resendEmailVerificationOTP: PropTypes.func.isRequired,
      otpVerificationStatus: PropTypes.string.isRequired,
      history: PropTypes.object.isRequired
    };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    verifyOTP: data => dispatch(verifyOTP(data)),
    resendEmailVerificationOTP: data => dispatch(resendEmailVerificationOTP(data))
  };
};

const mapStateToProps = state => {
  const {auth} = state;
  return {
    email: auth.login.email,
    otpVerificationStatus: auth.otp.status
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(translate(VerifyOTP)));
