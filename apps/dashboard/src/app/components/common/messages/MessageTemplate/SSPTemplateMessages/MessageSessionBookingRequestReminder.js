
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import SessionScheduleItem from './SessionScheduleItem';

import appConstants from '../../../../../constants/appConstants';
const {sessionEventActions} = appConstants;
const {ACCEPT, REJECT} = sessionEventActions;

class MessageSessionBookingRequestReminder extends PureComponent {
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
          <a onClick={onAction} data-action={ACCEPT} className="msg_messagesDetail-ctaBtn"><i className="uk-icon-check"/>{ p.t('MessageSessionScheduleRequest.accept') }</a>
          <a onClick={onAction} data-action={REJECT} className="msg_messagesDetail-ctaBtn"><i className="uk-icon-close"/> { p.t('MessageSessionScheduleRequest.decline')}</a>
        </div>
      );
    }
    return null;
  }

  render() {
    const {p, message} = this.props;
    const {body} = message;
    const {session, remainingHoursToTakeAction} = body;
    const {skill, sport, ageGroup} = session;
    return (
      <div>
        <div className="msg_messagesDetail-scheduleActions uk-clearfix">
          <div className="msg_messagesDetail-scheduleCount">{p.t('MessageSessionBookingRequestReminder.youReceivedBookingRequest', {remainingHour: remainingHoursToTakeAction})}</div>
          {
            this.renderActions()
          }
        </div>
        <div className="msg_messagesDetail-messageContent uk-clearfix">
          <div className="msg_messagesDetail-scheduleContainer">
            <div className="msg_messagesDetail-scheduleHeader">
              <strong>{p.t('MessageSessionScheduleRequest.sessionDetails', {skill, sport, ageGroup})}</strong>
              <i className="uk-icon-circle"/> {session.name}
            </div>
            <SessionScheduleItem
              sessionItem={{...session, isNotSchedule: false}}
              isMultipleSession={false}
              onAction={this.handleOnSelectSessionItem}
            />

          </div>
        </div>
      </div>
    );
  }
}

MessageSessionBookingRequestReminder.defaultProps = {

};

MessageSessionBookingRequestReminder.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  onAction: PropTypes.func.isRequired
};
export default translate(MessageSessionBookingRequestReminder);

