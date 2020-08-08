
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import moment from 'moment';

import MessageSessionDetails from '../MessageSessionDetails';

class MessageBookingReminderAthlete extends PureComponent {
  render() {
    const {p, message, name} = this.props;
    const {body} = message;
    const {sessions, sessionDateTime} = body;
    const todayDate = (sessionDateTime) ? (moment(sessionDateTime)).format(p.t('sesionDateFormat')) : undefined;
    return (
      <div className="msg_messagesDetail-messageContent">

        <div className="msg_messagesDetail-messageSimple msg_messagesDetail-messageSimpleSec">

          <p>{p.t('dearWithName', {name})}</p>
          <p>{p.t('youCanHaveSessionToday', {date: todayDate})}</p>
          <div className="msg-content-border"/>
          {
            sessions.map(session => <MessageSessionDetails key={session.name} session={session}/>)
          }
          <p>{p.t('ifYouHaveAnyQuestions')}</p>

        </div>

      </div>
    );
  }
}
MessageBookingReminderAthlete.defaultProps = {

};

MessageBookingReminderAthlete.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};
export default translate('MessageSessionBookingReminder')(MessageBookingReminderAthlete);

