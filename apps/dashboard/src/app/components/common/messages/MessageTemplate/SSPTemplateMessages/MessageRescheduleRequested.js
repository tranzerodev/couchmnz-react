
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import {Link} from 'react-router-dom';;
import moment from 'moment';

import MessageTemplateSignatureFooter from '../MessageTemplateSignatureFooter';
import MessageSessionDetails from '../MessageSessionDetails';
import {DASHBOARD_MANAGE_BOOKING} from '../../../../../constants/pathConstants';

class MessageRescheduleRequested extends PureComponent {
  render() {
    const {p, message, name} = this.props;
    const {body} = message;
    const {newSession, oldSession} = body;
    const dateTime = (oldSession.startDate) ? (moment(oldSession.startDate)).format(p.t('sesionDateTimeFormat')) : undefined;
    const reSessionDateTime = (newSession.startDate) ? (moment(newSession.startDate)).format(p.t('sesionDateTimeFormat')) : undefined;

    const sessionType = body.ageGroup;
    const sport = body.sport;
    const location = oldSession.address;
    const rescheduleLocation = newSession.address;
    const sessionName = newSession.name;
    const updatedSession = {
      sessionName: newSession.name,
      sessionType: body.ageGroup,
      sport: body.sport,
      athleteName: newSession.athleteName,
      sessionDateTime: newSession.startDate,
      location: newSession.address,
      reason: newSession.reason
    };

    return (
      <div className="msg_messagesDetail-messageContent">
        <div className="msg_messagesDetail-messageSimple msg_messagesDetail-messageSimpleSec">
          <p>{p.t('dearWithName', {name})}</p>
          <p>{p.t('sessionChangeDetails', {dateTime, reSessionDateTime, location, sessionType, sport, rescheduleLocation, sessionName})}</p>
          <div className="msg-content-border"/>
          <MessageSessionDetails session={updatedSession}/>
          <p>{p.t('toAcceptRequestPleaseLogin')} <Link to={DASHBOARD_MANAGE_BOOKING}> {p.t('here')}</Link>.</p>
          <p>{p.t('ifYouHaveAnyQuestions')}</p>
          <MessageTemplateSignatureFooter/>
        </div>
      </div>
    );
  }
}

MessageRescheduleRequested.defaultProps = {

};

MessageRescheduleRequested.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};
export default translate('MessageSessionChangeRequest')(MessageRescheduleRequested);
