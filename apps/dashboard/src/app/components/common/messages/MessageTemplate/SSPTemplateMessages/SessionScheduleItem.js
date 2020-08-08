
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import moment from 'moment';

import appConstants from '../../../../../constants/appConstants';
const {sessionEventActions} = appConstants;

class SessionScheduleItem extends PureComponent {
  render() {
    const {p, sessionItem, isMultipleSession, onAction, takeAction, accepted, declined} = this.props;
    const {startDate, endDate, address, openPosition, totalSession, isNotSchedule} = sessionItem;
    const sessionDate = (startDate) ? (moment(startDate)).format(p.t('sesionDateFormat')) : undefined;
    const sessionStartTime = (startDate) ? (moment(startDate)).format(p.t('sesionStartTimeFormat')) : undefined;
    const sessionEndTime = (endDate) ? (moment(endDate)).format(p.t('sesionEndTimeFormat')) : undefined;
    return (
      <div className="msg_messagesDetail-scheduleItem uk-clearfix">
        <div className="msg_messagesDetail-scheduleInfo">
          <span><strong>{sessionItem.name}</strong> {(isNotSchedule === appConstants.hasSession.yes) ? '' : p.t('openPositions', {openPosition, totalSession})}</span>
          <span>{(isNotSchedule === appConstants.hasSession.yes) ? p.t('notSchduled') : address}</span>
        </div>
        {
          (isNotSchedule === appConstants.hasSession.yes) ?
            '' :
            <div className="msg_messagesDetail-scheduleTime">
              <span>{sessionDate}</span> <i className="uk-icon-circle"/>
              <span>{sessionStartTime } - { sessionEndTime}</span>
            </div>

        }
        {
          (isMultipleSession && (takeAction === true)) ?
            <div className="msg_messagesDetail-scheduleOptions">
              <a onClick={onAction} data-action={sessionEventActions.ACCEPT} data-id={sessionItem.id} className={'msg_messagesDetail-ctaBtn ' + ((accepted) ? 'checked' : '')}><i className="uk-icon-check"/></a>
              <a onClick={onAction} data-action={sessionEventActions.REJECT} data-id={sessionItem.id} className={'msg_messagesDetail-ctaBtn ' + ((declined) ? 'checked' : '')}><i className="uk-icon-close"/></a>

            </div> : ''

        }
      </div>
    );
  }
}
SessionScheduleItem.defaultProps = {
  takeAction: true,
  accepted: false,
  declined: false
};

SessionScheduleItem.propTypes = {
  sessionItem: PropTypes.object.isRequired,
  isMultipleSession: PropTypes.bool.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  onAction: PropTypes.func.isRequired,
  takeAction: PropTypes.bool,
  accepted: PropTypes.bool,
  declined: PropTypes.bool
};
export default translate('SessionScheduleItem')(SessionScheduleItem);

