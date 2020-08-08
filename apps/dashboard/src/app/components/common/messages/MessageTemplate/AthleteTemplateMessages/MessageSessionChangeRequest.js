
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import moment from 'moment';
import {Link} from 'react-router-dom';

import MessageTemplateSignatureFooter from '../MessageTemplateSignatureFooter';
import MessageSessionDetails from '../MessageSessionDetails';
import {getUrlWithProfileType} from '../../../../../utils/path';
import {DASHBOARD_ATHLETE_SCHEDULER_CHANGES} from '../../../../../constants/pathConstants';

class MessageSessionChangeRequest extends PureComponent {
  render() {
    const {p, message, name, selectedProfile} = this.props;
    const {body} = message;
    const {session, SSPName} = body;
    const {sessionDateTime, rescheduleSessionDateTime} = session;
    const dateTime = (sessionDateTime) ? (moment(sessionDateTime)).format(p.t('sesionDateTimeFormat')) : undefined;
    const reSessionDateTime = (rescheduleSessionDateTime) ? (moment(rescheduleSessionDateTime)).format(p.t('sesionDateTimeFormat')) : undefined;
    const path = getUrlWithProfileType(DASHBOARD_ATHLETE_SCHEDULER_CHANGES, selectedProfile.type);

    const newSession = {
      sessionName: session.sessionName,
      sessionType: session.sessionType,
      sport: session.sport,
      athleteName: SSPName,
      sessionDateTime: session.rescheduleSessionDateTime,
      location: session.rescheduleLocation,
      reason: session.reason,
      confirmedNumber: session.confirmedNumber,
      capacityNumber: session.capacityNumber
    };
    return (

      <div className="msg_messagesDetail-messageContent">

        <div className="msg_messagesDetail-messageSimple msg_messagesDetail-messageSimpleSec">

          <p>{p.t('dearWithName', {name})}</p>
          <p>{p.t('sessionChangeDetails', {SSPName, dateTime, reSessionDateTime, ...session})}</p>
          <div className="msg-content-border"/>
          <MessageSessionDetails session={newSession}/>
          <p>{p.t('toAcceptRequestPleaseLogin')} <Link to={path}>{p.t('here')}</Link>.</p>
          <p>{p.t('ifYouHaveAnyQuestions')}</p>
          <MessageTemplateSignatureFooter/>

        </div>

      </div>
    );
  }
}
MessageSessionChangeRequest.defaultProps = {

};

MessageSessionChangeRequest.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  selectedProfile: PropTypes.object.isRequired
};
export default translate('MessageSessionChangeRequest')(MessageSessionChangeRequest);

