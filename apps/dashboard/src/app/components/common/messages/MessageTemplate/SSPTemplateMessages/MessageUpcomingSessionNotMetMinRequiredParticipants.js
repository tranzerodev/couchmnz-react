import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import moment from 'moment';

import MessageTemplateSignatureFooter from '../MessageTemplateSignatureFooter';

class MessageUpcomingSessionNotMetMinRequiredParticipants extends PureComponent {
  render() {
    const {p, message, name} = this.props;
    const {body} = message;
    const {location, sessionName, sessionLesson, sessionDateTime, sport} = body;
    const dateTime = (sessionDateTime) ? (moment(sessionDateTime)).format(p.t('sesionDateTimeFormat')) : undefined;
    return (
      <div className="msg_messagesDetail-messageContent">

        <div className="msg_messagesDetail-messageSimple msg_messagesDetail-messageSimpleSec">

          <p>{p.t('dearWithName', {name})}</p>
          <p>{p.t('messageDetails', {sessionName, sessionLesson, dateTime, sport, location})}</p>
          <p>{p.t('whatYouCanDo')}</p>
          <ol>
            <li>{p.t('reason1')}</li>
            <li>{p.t('reason2')}</li>
            <li>{p.t('reason3')}</li>
          </ol>
          <p><strong>{p.t('pleaseTakeActions')}</strong></p>
          <p>{p.t('ifYouHaveAnyQuestions')}</p>
          <MessageTemplateSignatureFooter/>
        </div>

      </div>
    );
  }
}
MessageUpcomingSessionNotMetMinRequiredParticipants.defaultProps = {

};

MessageUpcomingSessionNotMetMinRequiredParticipants.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};
export default translate('MessageUpcomingSessionNotMetMinRequiredParticipants')(MessageUpcomingSessionNotMetMinRequiredParticipants);

