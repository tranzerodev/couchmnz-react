import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import validateSessionBuffer from '../../../../../../validators/ssp/isp/sessionBuffer';
import {ispUpdateSessionBuffer} from '../../../../../../actions';
import appConstants from '../../../../../../constants/appConstants';

class SessionBufferModal extends Component {
  constructor(props) {
    super(props);
    const {scheduledSession} = this.props;
    const sessionBuffer = (scheduledSession.bufferBetweenSession) ? scheduledSession.bufferBetweenSession : 0;
    const validation = validateSessionBuffer(sessionBuffer);
    this.state = {
      submitted: false,
      sessionBuffer,
      validation
    };
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleSessionBufferChange = this.handleSessionBufferChange.bind(this);
    this.handleSubmitkButtonClicked = this.handleSubmitkButtonClicked.bind(this);
  }

  handleCancelClick() {
    this.props.onCancel();
  }
  handleSubmitkButtonClicked() {
    const {selectedProfile, scheduledSession} = this.props;
    const {sessionBuffer, validation} = this.state;
    if (validation.valid) {
      this.props.ispUpdateSessionBuffer(selectedProfile.id, scheduledSession.id, sessionBuffer);
      this.props.onCancel();
    } else {
      this.setState({
        submitted: true
      });
    }
  }

  handleSessionBufferChange(e) {
    const {value} = e.target;
    const validation = validateSessionBuffer(value);
    this.setState({
      sessionBuffer: parseInt(value, 10),
      validation
    });
  }

  render() {
    const {p, sport} = this.props;
    const {validation, submitted} = this.state;
    const offerTerminology = sport.offerTerminology;
    return (
      <div id="session-buffer-modal" className="cl-sd-modal-common">
        <div className="uk-modal-dialog cl-sd-modal-width-one">
          <a className="uk-modal-close uk-close" onClick={this.handleCancelClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
              <g fill="none" fillRule="evenodd" stroke="#999" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                <path d="M10.525 1.626l-9.05 9.051M1.475 1.626l9.05 9.051"/>
              </g>
            </svg>
          </a>
          <div className="uk-modal-header mb60">
            <h2>{p.t('SessionBuffer.title')}</h2>
          </div>
          <div className="uk-modal-body">
            <div className={validation.sessionBuffer === false && submitted ? 'field-holder error' : 'field-holder'}>
              <div className="uk-grid">
                <div className="uk-width-large-1-1">
                  <label className="uk-form-label" htmlFor>{p.t('SessionBuffer.bufferBetweenSessions')}</label>
                  <input onChange={this.handleSessionBufferChange} type="number" className="cl-sd-input-text-full-width" value={this.state.sessionBuffer} step={appConstants.profileSession.buffer.step} min={appConstants.profileSession.buffer.min}/>
                </div>
              </div>
              <span className="error-text">{this.props.p.t('SessionsCreateModal.session.bufferBetweenSession', {session: offerTerminology, minimum: appConstants.profileSession.buffer.min, default: appConstants.profileSession.buffer.step})}</span>
            </div>
          </div>
          <div className="uk-modal-footer btn-red">
            <div className="uk-grid">
              <div className="uk-width-5-10 uk-text-left">
                <button type="button" onClick={this.handleSubmitkButtonClicked} className="uk-modal-close uk-close theme-orange-btn">{p.t('SessionBuffer.submit')}</button>
              </div>
              <div className="uk-width-5-10 uk-text-right">
                <button type="button" className="uk-modal-close uk-close theme-white-btn uk-text-right" onClick={this.handleCancelClick}>{p.t('SessionBuffer.cancel')}</button>
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
      scheduledSession: PropTypes.object.isRequired,
      ispUpdateSessionBuffer: PropTypes.func.isRequired,
      selectedProfile: PropTypes.object.isRequired,
      sport: PropTypes.object.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {profile, sport, userProfiles} = state;
  return {
    profile,
    sport,
    selectedProfile: userProfiles.selectedProfile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ispUpdateSessionBuffer: (profileID, scheduledSessionId, sessionBuffer) => dispatch(ispUpdateSessionBuffer(profileID, scheduledSessionId, sessionBuffer))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(translate(SessionBufferModal));
