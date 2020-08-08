import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import moment from 'moment';

import BookingInfo from './BookingInfo';
import InviteFriend from './InviteFriend';
import appconstants from '../../../../../constants/appConstants';
class MessageRescheduleSuccessFull extends PureComponent {
  render() {
    const {p, message, name} = this.props;
    const {body} = message;
    const {newSession, oldSession, actorType} = body;
    const {startDate, endDate, address} = oldSession;
    const sessionStartDateTime = (moment(startDate)).format(p.t('sesionStartDateTimeFormat'));
    const sessionEndTime = (moment(endDate)).format(p.t('sesionEndTimeFormat'));
    const {coach} = newSession;
    return (
      <div className="msg_messagesDetail-messageContent">

        <div className="msg_messagesDetail-headerWrapper">

          <div className="msg_messagesDetail-iconWrapper">
            <i className="cl-icon cl-icon--xlarge cl-icon-message-tick"/>
          </div>

          <div className="msg_messagesDetail-headercContentWrapper">
            <strong>{p.t('yourSessionSuccessfullyReschduled')}</strong>
          </div>

        </div>

        <div className="msg_messagesDetail-messageSimple">

          <p>{p.t('hiWithName', {name})}</p>
          <p>{(actorType === appconstants.bookingActorType.athlete) ? p.t('msgDetailYouAccepted') : p.t('msgDetail', {coachName: coach.name})}</p>
        </div>

        <BookingInfo session={newSession}/>

        <div className="msg_messagesDetail-bookingOriginal">
          <span className="msg_bookingOriginal-title"><strong>{p.t('yourOriginalBooking')}</strong></span>
          <span className="msg_bookingOriginal-schedule">{sessionStartDateTime} - {sessionEndTime},</span>
          <span className="msg_bookingOriginal-location">{address}</span>
        </div>

      </div>

    );
  }
}
MessageRescheduleSuccessFull.defaultProps = {

};

MessageRescheduleSuccessFull.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};
export default translate('MessageRescheduleSuccessFull')(MessageRescheduleSuccessFull);

