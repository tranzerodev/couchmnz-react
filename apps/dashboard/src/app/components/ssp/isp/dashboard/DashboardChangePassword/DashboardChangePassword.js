import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import config from '../../../../../config';
import {REJECTED, PENDING} from '../../../../../constants/ActionTypes';
import {changePassword} from '../../../../../actions';
import {notNull} from '../../../../../validators/common/util';

class DashboardChangePassword extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      submit: false
    };
    this.handleChangePasswordFileds = this.handleChangePasswordFileds.bind(this);
    this.handleSubmitChangedPassword = this.handleSubmitChangedPassword.bind(this);
    this.validateCurrentPassword = this.validateCurrentPassword.bind(this);
    this.validateNewPassword = this.validateNewPassword.bind(this);
    this.validateConfirmPassword = this.validateConfirmPassword.bind(this);
    this.validateAll = this.validateAll.bind(this);
    this.renderServerErrorMessage = this.renderServerErrorMessage.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const {changePasswordStatus} = this.props;
    if (newProps.changePasswordStatus !== PENDING && changePasswordStatus !== newProps.changePasswordStatus) {
      this.setState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        submit: false
      });
    }
  }

  validateCurrentPassword() {
    const {currentPassword} = this.state;
    if (currentPassword) {
      return (currentPassword.trim().length > 0);
    }
    return false;
  }

  validateNewPassword() {
    const {email} = this.props;
    const {newPassword, currentPassword} = this.state;
    if ((newPassword !== currentPassword) && (newPassword !== email)) {
      return config.RegExp.password.test(newPassword);
    }
    return false;
  }

  validateConfirmPassword() {
    const {newPassword, confirmPassword} = this.state;
    return (newPassword === confirmPassword);
  }

  validateAll() {
    const validNewPassword = this.validateNewPassword();
    const validConfirmPassword = this.validateConfirmPassword();
    const validCurrentPassword = this.validateCurrentPassword();
    return (validCurrentPassword && validNewPassword && validConfirmPassword);
  }

  handleChangePasswordFileds(event) {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmitChangedPassword() {
    const {newPassword, currentPassword} = this.state;
    this.setState({
      submit: true
    });
    if (this.validateAll()) {
      this.props.changePassword(currentPassword, newPassword);
    }
  }

  renderServerErrorMessage() {
    const {p, changePasswordResponse} = this.props;
    if (changePasswordResponse && changePasswordResponse.data && changePasswordResponse.data.error ) {
      return (
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
            <div className="gen_error">
              <div className="tableDiv">
                <div className="lCol">
                  <i className="fa fa-exclamation-triangle" aria-hidden="true"/>
                </div>
                <div className="rCol">
                  <p>{changePasswordResponse.data.error}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
  render() {
    const {p} = this.props;
    const {newPassword, confirmPassword, submit, currentPassword} = this.state;

    const inValidCurrentPassword = ((!this.validateCurrentPassword()) && submit);

    const invalidNewPassword = ((!this.validateNewPassword()) && submit);

    const invalidConfirmPassword = ((!this.validateConfirmPassword()) && submit);

    return (
      <div className="cl-sd-trainingLocationInner">
        <div className="accDetails">
          <h1 className="uk-padding-remove">{p.t('DashboardChangePassword.changePassword')}</h1>
          <p className="mb25">{p.t('DashboardChangePassword.instruction')}</p>
          <div className="uk-grid">
            <div className="uk-width-xlarge-4-10 uk-width-large-4-10 uk-width-medium-1-2 uk-width-small-1-1 ">
              <div className={(inValidCurrentPassword) ? 'field-holder error' : 'field-holder'}>
                <label>{p.t('DashboardChangePassword.currentPassword')}</label>
                <input type="password" name="currentPassword" className="uk-form-controls" placeholder={p.t('DashboardChangePassword.currentPassPlaceholder')} onChange={this.handleChangePasswordFileds} value={currentPassword}/>
                <span className="error-text">{p.t('DashboardChangePassword.validationMessages.currentPassword')}</span>
              </div>
            </div>
          </div>
          <div className="uk-grid">
            <div className="uk-width-xlarge-4-10 uk-width-large-4-10 uk-width-medium-1-2 uk-width-small-1-1 ">
              <div className={(invalidNewPassword) ? 'field-holder error' : 'field-holder'}>
                <label>{p.t('DashboardChangePassword.newPassword')}</label>
                <input type="password" name="newPassword" className="uk-form-controls" placeholder={p.t('DashboardChangePassword.newPassPlaceholder')} onChange={this.handleChangePasswordFileds} value={newPassword}/>
                <span className="error-text">{notNull(newPassword) ? p.t('DashboardChangePassword.validationMessages.passwordPattern') : p.t('DashboardChangePassword.validationMessages.newPassword')}</span>
              </div>
            </div>
            <div className="uk-width-xlarge-4-10 uk-width-large-4-10 uk-width-medium-1-2 uk-width-small-1-1 ">
              <div className={(invalidConfirmPassword) ? 'field-holder error' : 'field-holder'}>
                <label>{p.t('DashboardChangePassword.confirmPassword')}</label>
                <input type="password" name="confirmPassword" className="uk-form-controls" placeholder={p.t('DashboardChangePassword.confirmPassPlaceholder')} onChange={this.handleChangePasswordFileds} value={confirmPassword}/>
                <span className="error-text">{notNull(confirmPassword) ? p.t('DashboardChangePassword.validationMessages.passwordMatch') : p.t('DashboardChangePassword.validationMessages.confirmPassword')}</span>
              </div>
            </div>
          </div>
          {
            this.renderServerErrorMessage()
          }

          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
              <a className="general_btn" onClick={this.handleSubmitChangedPassword}>{p.t('DashboardChangePassword.btnUpdate')}</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DashboardChangePassword.defaultProps = {

};

DashboardChangePassword.propTypes = {
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  email: PropTypes.string.isRequired,
  changePasswordStatus: PropTypes.string.isRequired,
  changePassword: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const {changePassword, profile} = state;
  const email = (profile.data.profile) ? profile.data.profile.email : null;
  return {
    email,
    changePasswordResponse: changePassword
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePassword: (currentPassword, newPassword) => dispatch(changePassword(currentPassword, newPassword))
  };
};

export default translate(connect(mapStateToProps, mapDispatchToProps)(DashboardChangePassword));
