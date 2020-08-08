import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import validateSessionNotes from '../../../../../../validators/ssp/isp/sessionNotes';
import {ispAddSessionNotes} from '../../../../../../actions';

class SessionNotesModal extends Component {
  constructor(props) {
    super(props);
    const sessionNotes = '';
    const validation = validateSessionNotes(sessionNotes);
    this.state = {
      submitted: false,
      sessionNotes,
      validation
    };
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleSubmitkButtonClicked = this.handleSubmitkButtonClicked.bind(this);
    this.handleSessionNotesChanged = this.handleSessionNotesChanged.bind(this);
  }

  handleCancelClick() {
    this.props.onCancel();
  }

  handleSubmitkButtonClicked() {
    const {selectedProfile, scheduledSession} = this.props;
    const {sessionNotes, validation} = this.state;
    if (validation.valid) {
      this.props.ispAddSessionNotes(selectedProfile.id, scheduledSession.id, sessionNotes);
      this.props.onCancel();
    } else {
      this.setState({
        submitted: true
      });
    }
  }

  handleSessionNotesChanged(event) {
    const {value} = event.target;
    const validation = validateSessionNotes(value);
    this.setState({
      sessionNotes: value,
      validation
    });
  }

  render() {
    const {p} = this.props;
    const {submitted, validation, sessionNotes} = this.state;
    return (
      <div id="session-notes-modal" className="cl-sd-modal-common">
        <div className="uk-modal-dialog cl-sd-modal-width-one">
          <a className="uk-modal-close uk-close" onClick={this.handleCancelClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
              <g fill="none" fillRule="evenodd" stroke="#999" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                <path d="M10.525 1.626l-9.05 9.051M1.475 1.626l9.05 9.051"/>
              </g>
            </svg>
          </a>
          <div className="uk-modal-header mb30">
            <h2>{p.t('SessionNotes.title')}</h2>
          </div>
          <div className="uk-modal-body">
            <div className={validation.sessionNotes === false && submitted ? 'field-holder error' : 'field-holder'}>
              <div className="uk-grid">
                <div className="uk-width-large-1-1">
                  <div className="uk-form-row">
                    <label className="uk-form-label">{p.t('SessionNotes.message')}</label>
                    <textarea onChange={this.handleSessionNotesChanged} className="cl-sd-textarea" cols rows={7} placeholder={p.t('SessionNotes.enterYourNotesHere')} value={sessionNotes}/>
                  </div>
                </div>
              </div>
              <span className="error-text">{p.t('SessionNotes.validation.sessionNotes')}</span>
            </div>
            <div className="uk-modal-footer btn-red">
              <div className="uk-grid">
                <div className="uk-width-5-10 uk-text-left">
                  <button type="button" onClick={this.handleSubmitkButtonClicked} className="uk-modal-close uk-close theme-orange-btn">{p.t('SessionNotes.submit')}</button>
                </div>
                <div className="uk-width-5-10 uk-text-right">
                  <button type="button" className="uk-modal-close uk-close theme-white-btn uk-text-right" onClick={this.handleCancelClick}>{p.t('SessionNotes.cancel')}</button>
                </div>
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
      ispAddSessionNotes: PropTypes.func.isRequired,
      scheduledSession: PropTypes.object.isRequired,
      selectedProfile: PropTypes.object.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {userProfiles} = state;
  return {
    selectedProfile: userProfiles.selectedProfile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ispAddSessionNotes: (profileID, scheduledSessionId, notes) => dispatch(ispAddSessionNotes(profileID, scheduledSessionId, notes))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(translate(SessionNotesModal));
