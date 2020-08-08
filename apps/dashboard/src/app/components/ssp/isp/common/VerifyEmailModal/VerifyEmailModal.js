import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import {verifyPaypalPin, verifyPaypalEmail} from '../../../../../actions/index';
import {FULFILLED, REJECTED, PENDING} from '../../../../../constants/ActionTypes';
import appConstants from '../../../../../constants/appConstants';
import {ClipLoader} from 'react-spinners';
/* eslint react/forbid-component-props:0 */
class VerifyEmail extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleResend = this.handleResend.bind(this);
    this.state = {code: '', validCode: false, submitted: false};
  }
  handleSubmit() {
    this.setState({submitted: true});
    if (this.state.validCode) {
      this.props.verifyPaypalPin({profileID: this.props.profile.data.profile.id}, {
        email: this.props.email,
        pin: this.state.code
      });
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
    this.props.verifyPaypalEmail({profileID: this.props.profile.data.profile.id}, {email: this.props.email});
  }
  componentWillReceiveProps(nextProp) {
    if (nextProp.paypalVerification.status === FULFILLED && nextProp.paypalVerification.data.email === nextProp.email) {
      this.props.handleClose();
    }
  }
  render() {
    return (
      <div id="verifyEmailModal">
        <div className="uk-modal-dialog uk-modal-dialog-small">
          <div className="uk-modal-header">
            <h1>{this.props.p.t('VerifyEmail.verify_email')}</h1>
          </div>
          <div className="uk-modal-body">
            <div className="uk-grid">
              <div className="uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
                <p>{this.props.p.t('VerifyEmail.p1')}</p>
                <p>{this.props.p.t('VerifyEmail.p2')}{this.props.email}!</p>
                <p>{this.props.p.t('VerifyEmail.p3')}</p>
              </div>
            </div>
            <div className="uk-grid">
              <div className="uk-width-large-1-2 uk-width-medium-1-1 uk-width-small-1-1">
                <div className={(this.state.submitted && !this.state.validCode) || (this.props.paypalVerification.status === REJECTED) ? 'field-holder error' : 'field-holder'}>
                  <input type="number" name="code" placeholder={this.props.p.t('VerifyEmail.enter') + ' ' + appConstants.paypalEmailVerificationCodeLength + ' ' + this.props.p.t('VerifyEmail.code')} onChange={this.handleChange}/>
                  {this.state.submitted && !this.state.validCode ?
                    <span className="error-text">{this.props.p.t('VerifyEmail.validation_message.code_length')}</span> :
                    <span className="error-text">{this.props.p.t('VerifyEmail.validation_message.match')} </span>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="uk-modal-footer">
            <div className="tableDiv">
              <div className="lCol">
                <a className="general_btn" onClick={this.handleSubmit}>{this.props.p.t('VerifyEmail.ok')}</a>
                <a className="link" onClick={this.handleResend}>{this.props.p.t('VerifyEmail.resend')}</a>
              </div>
              <div className="rCol">
                <a onClick={this.props.handleClose} className="cancel">{this.props.p.t('VerifyEmail.cancel')}</a>
              </div>
            </div>
          </div>
        </div>
        <div className={this.props.paypalVerification.status === PENDING ? 'overlayLoader' : ''}>
          <ClipLoader loading={this.props.paypalVerification.status === PENDING} size={30}/>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      handleClose: PropTypes.func.isRequired,
      email: PropTypes.string.isRequired,
      verifyPaypalPin: PropTypes.func.isRequired,
      verifyPaypalEmail: PropTypes.func.isRequired,
      profile: PropTypes.object.isRequired,
      paypalVerification: PropTypes.object.isRequired
    };
  }
}
VerifyEmail.defaultProps = {

};
const mapStateToProps = state => {
  const {paypalVerification, profile, paypalDetails} = state;
  return {
    paypalVerification,
    profile,
    paypalDetails
  };
};
const mapDispatchToProps = dispatch => {
  return {
    verifyPaypalPin: (params, data) => dispatch(verifyPaypalPin(params, data)),
    verifyPaypalEmail: (params, data) => dispatch(verifyPaypalEmail(params, data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(translate(VerifyEmail));
