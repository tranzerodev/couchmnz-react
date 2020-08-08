import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {withRouter} from 'react-router-dom';

import Modal from '../../common/Modal';
import validateSignUp from '../../../validators/common/signUp';
import {signUp, checkEmailAvailability} from '../../../actions/index';
import {PENDING, FULFILLED, REJECTED} from '../../../constants/ActionTypes';
import {VERIFY_OTP} from '../../../constants/pathConstants';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleAgree = this.handleAgree.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getValidationClassName = this.getValidationClassName.bind(this);
    this.handleCheckEmailAvailability = this.handleCheckEmailAvailability.bind(this);
    this.getEmailAvailAbility = this.getEmailAvailAbility.bind(this);
    this.renderServerError = this.renderServerError.bind(this);
    this.handleSigin = this.handleSigin.bind(this);

    this.state = {
      data: {
        fname: '',
        lname: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        mobile: ''
      },
      agree: false,
      submitted: false,
      validation: {
        fname: false,
        lname: false,
        email: {required: false, valid: false},
        password: {required: false, valid: false},
        confirmPassword: {required: false, match: false},
        mobile: {required: false, valid: false},
        phone: true
      }
    };
  }

  componentDidUpdate(preProps) {
    const {signUpStatus} = preProps;
    if (signUpStatus.status === PENDING && this.props.signUpStatus.status === FULFILLED) {
      this.props.history.push(VERIFY_OTP);
      this.props.onClose();
    }
  }

  handleSigin() {
    this.props.onSigin();
    this.props.onClose();
  }

  handleSubmit() {
    const {validation, agree, data} = this.state;
    const {signUpStatus} = this.props;
    const {status} = signUpStatus;
    const isEmailAvailable = this.getEmailAvailAbility(data.email);
    if (validation.valid && agree && isEmailAvailable === FULFILLED && status !== PENDING) {
      this.props.signUp(data);
    }
    this.setState({submitted: true});
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    const data = Object.assign({}, this.state.data);
    data[name] = value;
    const validation = validateSignUp(data);
    this.setState({data, validation});
  }

  handleAgree(e) {
    this.setState({agree: e.target.checked});
  }

  handleCheckEmailAvailability(e) {
    const email = e.target.value;
    const {validation} = this.state;
    if (validation.email.valid && validation.email.required) {
      this.props.checkEmailAvailability({email});
    }
  }

  getEmailAvailAbility(email) {
    const {emailAvailability} = this.props;
    const {status, data} = emailAvailability;
    if (status === FULFILLED && data.email === email) {
      return data.isExist === false ? FULFILLED : REJECTED;
    }
    return PENDING;
  }

  getValidationClassName(fields) {
    const {submitted} = this.state;
    return fields.indexOf(false) > -1 && submitted === true ? 'formfld field-holder error' : 'formfld field-holder';
  }

  renderServerError() {
    const {signUpStatus} = this.props;
    const {status, displayMessage} = signUpStatus;
    if (status === REJECTED) {
      return (
        <div className="cl-sd-alert-box">
          <p>{displayMessage}</p>
        </div>
      );
    }
  }

  render() {
    const {isModalOpen, p, onClose} = this.props;
    const {t} = p;
    const {data, agree, validation} = this.state;
    const {fname, lname, email, password, confirmPassword, mobile, phone} = data;
    const isEmailAvailable = this.getEmailAvailAbility(email);

    return (
      <Modal isModalOpen={isModalOpen} onClose={onClose}>
        <div id="signUpModal" className="signup-1-2">
          <div className="uk-modal-dialog uk-modal-dialog-small">
            <div className="uk-modal-header">
              <h2 className="uk-modal-title">{t('SignUp.sign_up')}</h2>
              <p>{t('SignUp.have_account')}<a onClick={this.handleSigin}> {t('SignUp.sign_in')}</a></p>
              {
                this.renderServerError()
              }
            </div>
            <div className="uk-modal-body">
              <form>
                <div className="uk-grid">
                  <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1 ">
                    <div className={this.getValidationClassName([validation.fname])}>
                      <input
                        value={fname}
                        onChange={this.handleChange}
                        className="field-required"
                        name="fname"
                        type="text"
                        placeholder={t('SignUp.placeholders.name')}
                      />
                      <span className="error-text">{t('SignUp.validation_messages.first_name')}</span>
                    </div>
                    <div className={this.getValidationClassName([validation.lname])}>
                      <input
                        value={lname}
                        onChange={this.handleChange}
                        className="field-required"
                        name="lname"
                        placeholder={t('SignUp.placeholders.last_name')}
                      />
                      <span className="error-text">{t('SignUp.validation_messages.last_name')}</span>
                    </div>
                    <div className={this.getValidationClassName([validation.email.required, validation.email.valid, isEmailAvailable !== REJECTED])}>
                      <input
                        value={email}
                        onChange={this.handleChange}
                        onBlur={this.handleCheckEmailAvailability}
                        className="field-required"
                        name="email"
                        placeholder={t('SignUp.placeholders.email')}
                      />
                      <span className="error-text">{validation.email.required === false ?
                        t('SignUp.validation_messages.email.required') : validation.email.valid === false ? t('SignUp.validation_messages.email.valid') :
                          t('SignUp.validation_messages.email.taken')
                      }
                      </span>
                    </div>
                    <div className={this.getValidationClassName([validation.mobile.required, validation.mobile.valid])}>
                      <input
                        value={mobile}
                        onChange={this.handleChange}
                        name="mobile"
                        type="number"
                        placeholder={t('SignUp.placeholders.mobile')}
                        className="field-required"
                        min={0}
                      />
                      <span className="error-text">{validation.mobile.required === false ?
                        t('SignUp.validation_messages.mobile.required') : t('SignUp.validation_messages.mobile.valid')}
                      </span>
                    </div>
                    <div className={this.getValidationClassName([validation.phone])}>
                      <input
                        value={phone}
                        onChange={this.handleChange}
                        name="phone"
                        type="number"
                        placeholder={t('SignUp.placeholders.business_number')}
                        min={0}
                      />
                      <span className="error-text">
                        {t('SignUp.validation_messages.mobile.valid')}
                      </span>
                    </div>
                    <div className="cl-sd-helpTextOne">
                      <p>{t('SignUp.password_note')}</p>
                    </div>
                    <div className={this.getValidationClassName([validation.password.required, validation.password.valid]) + ' psswd mb15'}>
                      <input
                        value={password}
                        onChange={this.handleChange}
                        className="field-required"
                        name="password"
                        type="password"
                        placeholder={t('SignUp.placeholders.password')}
                      />
                      <span className="designOuter" id="lengthchk"/>
                      <div id="error-nwl1"/>
                      <span className="error-text">{validation.password.required === false ?
                        t('SignUp.validation_messages.password.required') : t('SignUp.validation_messages.password.valid')}
                      </span>
                    </div>
                    <div className={this.getValidationClassName([validation.confirmPassword.required, validation.confirmPassword.match])}>
                      <input
                        value={confirmPassword}
                        onChange={this.handleChange}
                        className="field-required"
                        name="confirmPassword"
                        type="password"
                        placeholder={t('SignUp.placeholders.confirm_password')}
                      />
                      <span className="error-text">{validation.confirmPassword.match ?
                        t('SignUp.validation_messages.confirm_password.required') : t('SignUp.validation_messages.confirm_password.match')}
                      </span>
                    </div>
                    <div className={'tandc ' + this.getValidationClassName([agree])}>
                      <input
                        onChange={this.handleAgree}
                        checked={agree}
                        id="box4"
                        type="checkbox"
                      />
                      <label htmlFor="box4">{t('SignUp.agree')} </label> <a onClick={this.props.onTOSOpen}>{t('SignUp.terms')}</a>
                      <span className="error-text">{t('SignUp.validation_messages.tos')}</span>
                    </div>
                    <div className="uk-grid">
                      <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1 ">
                        <button
                          type="button"
                          onClick={this.handleSubmit}
                          className="uk-button uk-text-left uk-text-uppercase mb30"
                        >
                          {t('SignUp.sign_up')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="uk-modal-footer"/>
          </div>
        </div>
      </Modal>
    );
  }

  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      isModalOpen: PropTypes.bool.isRequired,
      signUp: PropTypes.func.isRequired,
      signUpStatus: PropTypes.object.isRequired,
      onClose: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired,
      onTOSOpen: PropTypes.func.isRequired,
      checkEmailAvailability: PropTypes.func.isRequired,
      emailAvailability: PropTypes.object.isRequired,
      onSigin: PropTypes.func.isRequired
    };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUp: data => dispatch(signUp(data)),
    checkEmailAvailability: data => dispatch(checkEmailAvailability(data))
  };
};

const mapStateToProps = state => {
  const {auth} = state;
  return {
    signUpStatus: auth.signUp,
    emailAvailability: auth.emailAvailability
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(translate(SignUp)));
