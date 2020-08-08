import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import {contactSSP} from '../../actions';
import config from '../../config/index';
import {FULFILLED, PENDING, REJECTED} from '../../constants/ActionTypes';

function notNull(object) {
  if (object !== undefined && object !== null && object.trim() !== '') {
    return true;
  }
  return false;
}

class ContactModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        body: ''
      },
      validation: {
        firstName: false,
        lastName: false,
        email: {
          required: false,
          valid: false
        },
        subject: false,
        body: false,
        valid: false
      },
      submitted: false,
      showSending: false,
      showError: false,
      showSuccess: false,
      canSend: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.status === FULFILLED) {
      this.setState({showSuccess: true});
      this.setState({showSending: false});
      setTimeout(() => {
        this.setState({canSend: true});
        this.props.onHide();
      }, 3000);
    //  This.props.onHide();
    }
    if (nextProps.status === PENDING) {
      this.setState({showSending: true});
      this.setState({canSend: false});
    }
    if (nextProps.status === REJECTED) {
      this.setState({showSending: false});
    }
  }

  validate(data) {
    const validation = {
      firstName: false,
      lastName: false,
      email: {
        required: false,
        valid: false
      },
      subject: false,
      body: false,
      valid: false
    };
    validation.firstName = notNull(data.firstName);
    validation.lastName = notNull(data.lastName);
    validation.email.required = notNull(data.email);
    validation.email.valid = Boolean(data.email.match(config.RegExp.Email));
    validation.subject = notNull(data.subject);
    validation.body = notNull(data.body);
    validation.valid = validation.firstName &&
    validation.lastName &&
    validation.email.required &&
    validation.email.valid &&
    validation.subject &&
    validation.body;
    return validation;
  }
  handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    const data = Object.assign({}, this.state.data);
    data[target] = value;
    const validation = this.validate(data);
    this.setState({data, validation});
  }
  handleSubmit() {
    const {validation, data} = this.state;
    this.setState({submitted: true});
    if (validation.valid && this.state.canSend) {
      this.props.contactSSP(data, this.props.nickname, this.props.sportID);
    }
  }

  render() {
    const {data, validation, submitted} = this.state;
    const {firstName, lastName, body, subject, email} = data;
    return (
      <div id="addtocartModal" className="degreeModal">
        <div className="uk-modal-dialog uk-modal-dialog-small">
          <form name="contactForm" onSubmit={this.handleSubmit}>
            <div className="uk-modal-header">
              <h2>{this.props.p.t('SSPProfile.contactModal.header')}</h2>
              <a className="del uk-modal-close" onClick={this.props.onHide}>
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
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                  <div className={submitted && validation.firstName === false ? 'field-holder error' : 'field-holder'}>
                    <label>{this.props.p.t('SSPProfile.contactModal.fName')}</label>
                    <input value={firstName} onChange={this.handleChange} type="text" name="firstName" className="field-required" placeholder={this.props.p.t('SSPProfile.contactModal.plaeholder.name')}/>
                    <span className="error-text">{this.props.p.t('SSPProfile.contactModal.nameErr')}</span>
                  </div>
                </div>
              </div>
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                  <div className={submitted && validation.lastName === false ? 'field-holder error' : 'field-holder'}>
                    <label>{this.props.p.t('SSPProfile.contactModal.lName')}</label>
                    <input type="text" value={lastName} onChange={this.handleChange} name="lastName" className="field-required" placeholder={this.props.p.t('SSPProfile.contactModal.plaeholder.lName')}/>
                    <span className="error-text">{this.props.p.t('SSPProfile.contactModal.lNameErr')}</span>
                  </div>
                </div>
              </div>
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                  <div className={submitted && (validation.email.required === false || validation.email.valid === false) ? 'field-holder error' : 'field-holder'}>
                    <label>{this.props.p.t('SSPProfile.contactModal.email')}</label>
                    <input type="email" name="email" onChange={this.handleChange} value={email} className="field-required" placeholder={this.props.p.t('SSPProfile.contactModal.plaeholder.email')}/>
                    <span className="error-text">{validation.email.required === false ? this.props.p.t('SSPProfile.contactModal.emailRequire') : this.props.p.t('SSPProfile.contactModal.emailInvalid')}</span>
                  </div>
                </div>
              </div>
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                  <div className={submitted && validation.subject === false ? 'field-holder error' : 'field-holder'}>
                    <label>{this.props.p.t('SSPProfile.contactModal.subject')}</label>
                    <input type="text" value={subject} onChange={this.handleChange} name="subject" className="field-required" placeholder={this.props.p.t('SSPProfile.contactModal.plaeholder.subject')}/>
                    <span className="error-text">{this.props.p.t('SSPProfile.contactModal.errSub')}</span>
                  </div>
                </div>
              </div>
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                  <div className={submitted && validation.body === false ? 'field-holder error' : 'field-holder'}>
                    <label>{this.props.p.t('SSPProfile.contactModal.message')}</label>
                    <textarea rows="4" value={body} onChange={this.handleChange} name="body" className="field-required" placeholder={this.props.p.t('SSPProfile.contactModal.plaeholder.message')}/>
                    <span className="error-text">{this.props.p.t('SSPProfile.contactModal.errMsg')}</span>
                  </div>
                </div>
              </div>

              {
                this.state.showSending ? <div className="cl-modal-processing" style={{display: 'block'}}>{this.props.p.t('SSPProfile.findSession.contactMessage.sending')}</div> : null
              }
              {
                this.state.showSuccess ? <div className="cl-modal-processing-success" style={{display: 'block'}}>{this.props.p.t('SSPProfile.findSession.contactMessage.success')}</div> : null
              }
              {
                this.state.showError ? <div className="cl-modal-processing-error" style={{display: 'block'}}>{this.props.p.t('SSPProfile.findSession.contactMessage.error')}</div> : null
              }
            </div>

            <div className="uk-modal-footer">
              <div className="tableDiv">
                <div className="lCol">
                  <a className={this.state.showSending || this.state.showSuccess ? 'general_btn' : 'general_btn'} onClick={this.handleSubmit}>{this.props.p.t('SSPProfile.contactModal.send')}</a>
                </div>
                <div className="rCol">
                  <a className="cancel" onClick={this.props.onHide}>{this.props.p.t('SSPProfile.contactModal.cancel')}</a>
                </div>
                {/* <div className="error-text" style={((this.props.status === 'REJECTED') ? {display: 'block'} : {display: 'none'})}>There was an error in sending your communication. Please try again later. Click Cancel to Close this form.</div>  */}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      onHide: PropTypes.func.isRequired,
      nickname: PropTypes.string.isRequired,
      sportID: PropTypes.string.isRequired,
      contactSSP: PropTypes.func.isRequired,
      p: PropTypes.shape({t: PropTypes.func}).isRequired
    };
  }
}

const mapStateToProps = state => {
  return {
    status: state.viewssp.contactSSP.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    contactSSP: (data, nickname, sportID) => dispatch(contactSSP(data, nickname, sportID))
  };
};

export default translate(withRouter(connect(mapStateToProps, mapDispatchToProps)(ContactModal)));
