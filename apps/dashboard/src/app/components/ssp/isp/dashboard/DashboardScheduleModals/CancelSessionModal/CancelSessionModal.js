import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import validateCancelSession from '../../../../../../validators/ssp/isp/cancelSession';
import appConstants from '../../../../../../constants/appConstants';
import {fetchReasons, ispCancelScheduledSession} from '../../../../../../actions';

const sortReasonsByName = (reason, reason1) => {
  return reason.name > reason1.name;
};

const DROP_DOWN_OPTION_SELECT = 'DROP_DOWN_OPTION_SELECT';

class CancelSessionModal extends Component {
  constructor(props) {
    super(props);
    const cancelSession = {
      reasonId: null,
      message: ''
    };
    const validation = validateCancelSession(cancelSession);
    this.state = {
      submitted: false,
      cancelSession,
      validation
    };
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleSubmitButtonClicked = this.handleSubmitButtonClicked.bind(this);
    this.handleReasonChange = this.handleReasonChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleCancelSesisionDataChange = this.handleCancelSesisionDataChange.bind(this);
    this.renderReasons = this.renderReasons.bind(this);
  }

  componentDidMount() {
    this.props.fetchReasons({event: appConstants.reasons.cancelSession});
  }

  handleCancelSesisionDataChange(cancelSessionData) {
    const {cancelSession} = this.state;
    const newCancelSession = Object.assign({}, cancelSession, cancelSessionData);
    const validation = validateCancelSession(newCancelSession);
    this.setState({
      cancelSession: newCancelSession,
      validation
    });
  }

  handleCancelClick() {
    this.props.onCancel();
  }
  handleSubmitButtonClicked() {
    const {validation, cancelSession} = this.state;
    if (validation.valid === true) {
      const {selectedProfile, scheduledSession} = this.props;
      this.props.ispCancelScheduledSession(selectedProfile.id, scheduledSession.id, cancelSession);
      this.props.onCancel();
    } else {
      this.setState({
        submitted: true
      });
    }
  }

  handleReasonChange(e) {
    const value = e.target.value;
    this.handleCancelSesisionDataChange({
      reasonId: (value === DROP_DOWN_OPTION_SELECT) ? null : value
    });
  }

  handleMessageChange(e) {
    const value = e.target.value;
    this.handleCancelSesisionDataChange({
      message: value
    });
  }

  renderReasons(reason) {
    return (
      <option key={reason.id} id={reason.id} value={reason.id} >{reason.reason}</option>
    );
  }

  render() {
    const {p, reasons} = this.props;
    const {submitted, validation, cancelSession} = this.state;
    const reason = reasons.find(item => item.id === cancelSession.reasonId);
    const selectedReason = (reason) ? reason.reason : p.t('ReSchedule.selectAReason');
    return (
      <div id="cancel-session-modal" className="cl-sd-modal-common">
        <div className="uk-modal-dialog cl-sd-modal-width-one">
          <a className="uk-modal-close uk-close" onClick={this.handleCancelClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
              <g fill="none" fillRule="evenodd" stroke="#999" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                <path d="M10.525 1.626l-9.05 9.051M1.475 1.626l9.05 9.051"/>
              </g>
            </svg>
          </a>
          <div className="uk-modal-header mb30">
            <h2>{p.t('CancelSession.title')}</h2>
          </div>
          <div className="uk-modal-body">
            <div className={validation.reasonId === false && submitted ? 'field-holder error' : 'field-holder'}>
              <div className="uk-grid">
                <div className="uk-width-large-1-1">
                  <div className="cl-sd-alert-box mb30">
                    <p>
                      {p.t('CancelSession.message')}
                    </p>
                  </div>
                </div>
                <div className="uk-width-7-10">
                  <label className="uk-form-label" htmlFor>{p.t('CancelSession.reasonForCancel')}</label>
                  <div className="uk-button uk-form-select uk-active margin0" data-uk-form-select>
                    <span className="cl-sd-modal-selected-option"> {selectedReason} </span>
                    <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" width={8} height={5} viewBox="0 0 8 5">
                      <path fill="none" fillRule="evenodd" stroke="#42B7DB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 1l3 3 3-3"/>
                    </svg>
                    <select name="cl-select-role" id="cl-select-role" onChange={this.handleReasonChange} value={cancelSession.reasonId ? cancelSession.reasonId : DROP_DOWN_OPTION_SELECT}>
                      <option value={DROP_DOWN_OPTION_SELECT} >{p.t('ReSchedule.selectAReason')}</option>
                      {
                        reasons.sort(sortReasonsByName).map(this.renderReasons)
                      }
                    </select>
                  </div>
                </div>
              </div>
              <span className="error-text">{p.t('CancelSession.validation.reason')}</span>
            </div>
            <span/>
            <div className={validation.message === false && submitted ? 'field-holder error' : 'field-holder'}>
              <div className="uk-grid">
                <div className="uk-width-1-1">
                  <div className="uk-form-row">
                    <label className="uk-form-label">{p.t('CancelSession.messageLabel')}</label>
                    <textarea onChange={this.handleMessageChange} className="cl-sd-textarea" cols rows={7} placeholder={p.t('CancelSession.hint')} value={cancelSession.message}/>
                  </div>
                </div>
              </div>
              <span className="error-text">{p.t('CancelSession.validation.reason')}</span>
            </div>
          </div>
          <div className="uk-modal-footer btn-red">
            <div className="uk-grid">
              <div className="uk-width-5-10 uk-text-left">
                <button type="button" onClick={this.handleSubmitButtonClicked} className="uk-modal-close uk-close theme-orange-btn">{p.t('CancelSession.yes')}</button>
              </div>
              <div className="uk-width-5-10 uk-text-right">
                <button type="button" className="uk-modal-close uk-close theme-white-btn uk-text-right" onClick={this.handleCancelClick}>{p.t('CancelSession.cancel')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  static get propTypes() {
    return {
      onCancel: PropTypes.func.isRequired,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
      reasons: PropTypes.array,
      fetchReasons: PropTypes.func.isRequired,
      ispCancelScheduledSession: PropTypes.func.isRequired,
      selectedProfile: PropTypes.object.isRequired,
      scheduledSession: PropTypes.object.isRequired
    };
  }
}

CancelSessionModal.defaultProps = {
  reasons: []

};

const mapStateToProps = state => {
  const {userProfiles, reasons} = state;
  return {
    selectedProfile: userProfiles.selectedProfile,
    reasons: reasons.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchReasons: event => dispatch(fetchReasons(event)),
    ispCancelScheduledSession: (profileID, scheduledSessionId, {reasonId, message}) => dispatch(ispCancelScheduledSession(profileID, scheduledSessionId, {reasonId, message}))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(translate(CancelSessionModal));
