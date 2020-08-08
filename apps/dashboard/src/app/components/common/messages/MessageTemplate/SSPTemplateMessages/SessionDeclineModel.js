import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import moment from 'moment';
import {Z_BLOCK} from 'zlib';

class SessionDeclineModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      cancelSession: {
        reason: null,
        reasonId: null,
        message: null
      },
      validation: ''
    };
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleSubmitButtonClicked = this.handleSubmitButtonClicked.bind(this);
    this.handleReasonChange = this.handleReasonChange.bind(this);
    this.handleMessageInput = this.handleMessageInput.bind(this);
  }
  handleCancelClick() {
    this.props.onCancel();
  }
  handleSubmitButtonClicked() {
    const {cancelSession} = this.state;
    const {reason} = cancelSession;
    if (reason) {
      this.setState({
        submitted: true
      });
    }
  }

  handleReasonChange(e) {
    const id = e.target.id;
    const {cancelSession} = this.state;
    this.setState({
      cancelSession: {...cancelSession,
        reason: e.target.value,
        reasonId: id
      }
    });
  }

  handleMessageInput(e) {
    const {cancelSession} = this.state;
    this.setState({
      cancelSession: {...cancelSession,
        message: e.target.value}
    });
  }

  render() {
    const {p, session} = this.props;
    const {userName, skill, sport, ageGroup, startDate, endDate} = session;
    const sessionDate = (startDate) ? (moment(startDate)).format(p.t('sesionDateFormat')) : undefined;
    const sessionEndTime = (endDate) ? (moment(endDate)).format(p.t('sesionEndTimeFormat')) : undefined;
    const isReasonSelected = Boolean(this.state.cancelSession.reason);
    return (
      <div id="cl-session-decline" >
        <div className="uk-modal-dialog">
          <a className="uk-modal-close" onClick={this.handleCancelClick}>
            <svg className="cl-icon-cross-blue-big" xmlns="http://www.w3.org/2000/svg" viewBox="-317.53 -5232.53 19.061 19.061">
              <g transform="translate(-1946.5 -5770.5)">
                <line data-name="Line 230" className="cl-icon-cross-blue-big-1" x2="18" y2="18" transform="translate(1629.5 538.5)"/>
                <line data-name="Line 231" className="cl-icon-cross-blue-big-1" x1="18" y2="18" transform="translate(1629.5 538.5)"/>
              </g>
            </svg>
          </a>
          <div className="cl-session-decline">
            <div className="cl-sd-header">
              <h3>{p.t('displayMessage')}</h3>
            </div>
            <div className="cl-sd-sessionInfo">
              <span>{userName}</span> <i className="uk-icon-circle"/>
              <span>{sessionDate + '-' + sessionEndTime}</span> <i className="uk-icon-circle"/>
              <span>{p.t('sessionDetails', {skill, sport, ageGroup})}</span>
            </div>
            <div className="cl-sd-sessionOptions">
              <ul className="cl-sd-sessionInputList">
                <li>
                  <input type="radio" onChange={this.handleReasonChange} value="Reason for declining 1" name="cl-input-decline" id="cl-input-decline1"/>
                  <label htmlFor="cl-input-decline1">Reason for declining 1</label>
                </li>
                <li>
                  <input type="radio" onChange={this.handleReasonChange} value="Reason for declining 2" name="cl-input-decline" id="cl-input-decline2"/>
                  <label htmlFor="cl-input-decline2">Reason for declining 2</label>
                </li>
                <li>
                  <input type="radio" onChange={this.handleReasonChange} value="Reason for declining 3" name="cl-input-decline" id="cl-input-decline3"/>
                  <label htmlFor="cl-input-decline3">Reason for declining 3</label>
                </li>
              </ul>
            </div>
            <div className="cl-sd-sessionReason" style={(isReasonSelected) ? {display: 'block'} : {display: 'none'}}>
              <textarea rows="6" placeholder="Include a message explaining why you are declining."/>
            </div>
            <div className="cl-modal-actions">
              <a onClick={this.handleCancelClick} className="cl-modal-actionsCancel">{p.t('cancel')}</a>
              <a onClick={this.handleSubmitButtonClicked} className={(isReasonSelected) ? 'cl-modal-actionsSubmit' : 'cl-modal-actionsSubmit  cl-modal-actionsSubmit--disabled'}>{p.t('declineSessionBooking')}</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      session: PropTypes.object.isRequired,
      onCancel: PropTypes.func.isRequired
    };
  }
}

export default translate('SessionDeclineModel')(SessionDeclineModel);
