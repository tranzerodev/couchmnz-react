import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import Modal from '../../common/Modal';
import validateLogin from '../../../validators/common/login';
import {login} from '../../../actions/index';
import {FULFILLED, REJECTED} from '../../../constants/ActionTypes';
import appConstants from '../../../constants/appConstants';
import {VERIFY_OTP} from '../../../constants/pathConstants';
import config from '../../../config';

const {auth} = appConstants;
const {errorCode} = auth;

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemeber = this.handleRemeber.bind(this);
    this.getValidationClassName = this.getValidationClassName.bind(this);
    this.hadleSignUp = this.hadleSignUp.bind(this);

    this.state = {
      data: {
        email: '',
        password: '',
        remember: false
      },
      validation: {
        email: {required: false, valid: false},
        password: false,
        valid: false
      },
      submitted: false
    };
  }

  componentDidUpdate(preProps) {
    const {loginStatus} = preProps;
    if (loginStatus !== FULFILLED) {
      if (this.props.loginStatus === REJECTED && this.props.responseCode === errorCode.accountNotActive) {
        this.props.history.push(VERIFY_OTP);
        this.props.onClose();
      }
    } else if (this.props.loginStatus === FULFILLED) {
      const {cartData} = this.props;
      if (preProps.cartData.status !== FULFILLED && this.props.cartData.status === FULFILLED) {
        if (cartData.data && cartData.data.cartItems && cartData.data.cartItems.length) {
          location.href = config.dashboardShoppingCart;
        } else {
          this.props.onClose();
        }
      }
    }
  }

  hadleSignUp() {
    this.props.onSignUp();
    this.props.onClose();
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    const data = Object.assign({}, this.state.data);
    data[name] = value;
    const validation = validateLogin(data);
    this.setState({data, validation});
  }

  handleSubmit() {
    const {validation, data} = this.state;
    if (validation.valid) {
      this.props.login(data);
    }
    this.setState({submitted: true});
  }

  handleRemeber(e) {
    const data = Object.assign({}, this.state.data);
    data.remember = e.target.checked;
    this.setState({data});
  }

  getValidationClassName(fields) {
    const {submitted} = this.state;
    return fields.indexOf(false) > -1 && submitted === true ? 'formfld field-holder error' : 'formfld field-holder';
  }

  renderServerError() {
    const {loginStatus, displayMessage} = this.props;
    if (loginStatus === REJECTED) {
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

    const {data, validation} = this.state;
    const {email, password, remember} = data;

    return (
      <Modal isModalOpen={isModalOpen} onClose={onClose}>
        <div id="signInModalwithoutSocial">
          <div className="uk-modal-dialog uk-modal-dialog-small">
            <div className="uk-modal-header">
              <h2 className="uk-modal-title">{t('Login.sign_in')}</h2>
              <p>{t('Login.new_to_coachlist')} <a onClick={this.hadleSignUp}>{t('Login.sign_up')} </a></p>
              {this.renderServerError()}
            </div>
            <div className="uk-modal-body">
              <form >
                <div className="uk-grid">
                  <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1 ">
                    <div className={this.getValidationClassName([validation.email.required, validation.email.valid])}>
                      <input
                        value={email}
                        onChange={this.handleChange}
                        name="email"
                        type="email"
                        placeholder={t('Login.placeholders.email')}
                      />
                      <span className="error-text">{validation.email.required === false ?
                        t('SignUp.validation_messages.email.required') : t('SignUp.validation_messages.email.valid')
                      }
                      </span>
                    </div>
                    <div className={this.getValidationClassName([validation.password])}>
                      <input
                        value={password}
                        onChange={this.handleChange}
                        name="password"
                        type="password"
                        placeholder={t('Login.placeholders.password')}
                        id=""
                      />
                      <span className="error-text">
                        {t('SignUp.validation_messages.password.required')}
                      </span>
                    </div>
                    <div className="tandc">
                      <input
                        value={remember}
                        onChange={this.handleRemeber}
                        id="box3"
                        type="checkbox"
                      />
                      <label htmlFor="box3">{t('Login.remember_me')} </label>
                    </div>
                    <div className="uk-grid">
                      <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-1 uk-width-small-1-1 ">
                        <button
                          onClick={this.handleSubmit}
                          type="button"
                          className="uk-button uk-text-left uk-text-uppercase"
                        >{t('Login.sign_in')}
                        </button>
                      </div>
                      <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-1 uk-width-small-1-1 formfld">
                        <div className="forgotpsd">
                          <a href={config.forgotPassWord}>{t('Login.forgot_password')}</a>
                        </div>
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
      onClose: PropTypes.func.isRequired,
      login: PropTypes.func.isRequired,
      cartData: PropTypes.object.isRequired,
      loginStatus: PropTypes.string.isRequired,
      displayMessage: PropTypes.string.isRequired,
      responseCode: PropTypes.number.isRequired,
      history: PropTypes.object.isRequired,
      onSignUp: PropTypes.func.isRequired
    };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: data => dispatch(login(data))
  };
};

const mapStateToProps = state => {
  const {auth, shoppingCart} = state;
  const {cartData} = shoppingCart;
  const {login} = auth;
  return {
    loginStatus: login.status ? login.status : '',
    cartData,
    displayMessage: login.displayMessage,
    responseCode: login.responseCode
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(translate(Login)));
