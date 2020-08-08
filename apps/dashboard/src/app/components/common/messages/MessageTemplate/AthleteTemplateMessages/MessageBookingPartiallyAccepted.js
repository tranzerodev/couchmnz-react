import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';

import BookingInfo from './BookingInfo';
import appConstants from '../../../../../constants/appConstants';
const {apiBooleanFlags} = appConstants;

class MessageBookingPartiallyAccepted extends PureComponent {
  constructor(props) {
    super(props);
    this.displayBookingInfo = this.displayBookingInfo.bind(this);
  }
  displayBookingInfo(session, index) {
    return (
      <BookingInfo key={index} session={session} isScheduled={session.isScheduled === apiBooleanFlags.TRUE}/>
    );
  }
  render() {
    const {p, message, name} = this.props;
    const {sessions, acceptedSessions, totalSessions, declinedSesions} = message.body;
    const session = sessions[0];
    const coachName = session.coach.name;
    const sessionName = session.name;
    const title = (acceptedSessions === totalSessions) ? p.t('bookingAccepted') : (declinedSesions === totalSessions) ? p.t('bookingDeclined') : p.t('bookingPartiallyAccepted');

    const tickIconClass = (declinedSesions === totalSessions) ? 'cl-icon cl-icon--xlarge cl-icon-message-cross' : 'cl-icon cl-icon--xlarge cl-icon-message-tick';

    return (
      <div className="msg_messagesDetail-messageContent">

        <div className="msg_messagesDetail-headerWrapper">

          <div className="msg_messagesDetail-iconWrapper">
            <i className={tickIconClass}/>
          </div>

          <div className="msg_messagesDetail-headercContentWrapper">
            <strong>{title}</strong>
          </div>

        </div>

        <div className="msg_messagesDetail-messageSimple">

          <p>{p.t('hiWithName', {name})}</p>

          <p>{p.t('msgDetail', {coachName, acceptedSessions, totalSessions, sessionName})}</p>

        </div>
        {
          sessions.map(this.displayBookingInfo)
        }
      </div>
    );
  }
}
MessageBookingPartiallyAccepted.defaultProps = {

};

MessageBookingPartiallyAccepted.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};
export default translate('MessageBookingPartiallyAccepted')(MessageBookingPartiallyAccepted);

