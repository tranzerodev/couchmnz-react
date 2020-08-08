
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';

import SessionScheduleItem from './SessionScheduleItem';

import appConstants from '../../../../../constants/appConstants';
const {sessionEventActions} = appConstants;

class MessageSessionRescheduleRequest extends Component {
  constructor(props) {
    super(props);
    this.renderActions = this.renderActions.bind(this);
  }

  renderActions() {
    const {message, p, onAction} = this.props;
    const {canTakeAction} = message;
    if (canTakeAction === appConstants.apiBooleanFlags.TRUE) {
      return (
        <div className="msg_messagesDetail-scheduleCtas">
          <a onClick={onAction} data-action={sessionEventActions.ACCEPT} className="msg_messagesDetail-ctaBtn"><i className="uk-icon-check"/> {p.t('accept')}</a>
          <a onClick={onAction} data-action={sessionEventActions.REJECT} className="msg_messagesDetail-ctaBtn"><i className="uk-icon-close"/> {p.t('decline')}</a>
        </div>
      );
    }
  }
  render() {
    const {message, p} = this.props;
    const {body} = message;
    const {skill, sport, ageGroup, newSession, oldSession, sessionLabel} = body;
    const athleteName = newSession.athleteName;
    return (
      <div>
        <div className="msg_messagesDetail-scheduleActions uk-clearfix">
          <div className="msg_messagesDetail-scheduleCount">{p.t('rescheduleRequest')}</div>
          {
            this.renderActions()
          }
        </div>
        <div className="msg_messagesDetail-messageContent uk-clearfix">

          <div className="msg_messagesDetail-scheduleContainer">
            <div className="msg_messagesDetail-scheduleHeader">
              <strong>{(sessionLabel) ? p.t('sessionLabelWithAthlete', {sessionLabel, athleteName}) : p.t('sessionDetails', {skill, sport, ageGroup, athleteName})}</strong>
            </div>
            <SessionScheduleItem sessionItem={{...oldSession, name: p.t('original_booking')}} isMultipleSession={false}/>
            <SessionScheduleItem sessionItem={{...newSession, name: p.t('rescheduleRequest')}} isMultipleSession={false}/>
          </div>
        </div>
      </div>
    );
  }
}
MessageSessionRescheduleRequest.defaultProps = {

};

MessageSessionRescheduleRequest.propTypes = {
  message: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  onAction: PropTypes.func.isRequired
};
export default translate('MessageSessionRescheduleRequest')(MessageSessionRescheduleRequest);
