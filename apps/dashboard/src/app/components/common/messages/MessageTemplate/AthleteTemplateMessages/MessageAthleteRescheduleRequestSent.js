
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import moment from 'moment';
import MessageTemplateSignatureFooter from '../MessageTemplateSignatureFooter';

class MessageAthleteRescheduleRequestSent extends PureComponent {
  render() {
    const {p, message, name} = this.props;
    const {body} = message;
    const {newSession, oldSession, sport} = body;
    const sessionDateTime = newSession.startDate;
    const rescheduleSessionDateTime = oldSession.startDate;
    const location = oldSession.address;
    const rescheduleLocation = newSession.address;
    const dateTime = (sessionDateTime) ? (moment(sessionDateTime)).format(p.t('sesionDateTimeFormat')) : undefined;
    const reSessionDateTime = (rescheduleSessionDateTime) ? (moment(rescheduleSessionDateTime)).format(p.t('sesionDateTimeFormat')) : undefined;
    return (

      <div className="msg_messagesDetail-messageContent">

        <div className="msg_messagesDetail-messageSimple msg_messagesDetail-messageSimpleSec">

          <p>{p.t('dearWithName', {name})}</p>
          <p>{p.t('sessionChangeDetails', {dateTime, reSessionDateTime, ...newSession, sport, location, rescheduleLocation})}</p>
          <div className="msg-content-border"/>
          <p>{p.t('ifYouHaveAnyQuestions')}</p>
          <MessageTemplateSignatureFooter/>

        </div>

      </div>
    );
  }
}
MessageAthleteRescheduleRequestSent.defaultProps = {

};

MessageAthleteRescheduleRequestSent.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};
export default translate('MessageAthleteRescheduleRequestSent')(MessageAthleteRescheduleRequestSent);

