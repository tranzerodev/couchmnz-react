import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import moment from 'moment';

import BookingInfo from './BookingInfo';
import MessageFindDifferentSSPBlock from './MessageFindDifferentSSPBlock';
import SeeRecommendation from './SeeRecommendation';

class MessageRescheduleRequestDeclined extends PureComponent {
  render() {
    const {p, message, name} = this.props;
    const {newSession, oldSession, sportName, location} = message.body;
    const {coach} = newSession;
    const {startDate, endDate, address} = oldSession;
    const sessionStartDateTime = (moment(startDate)).format(p.t('sesionStartDateTimeFormat'));
    const sessionEndTime = (moment(endDate)).format(p.t('sesionEndTimeFormat'));
    return (
      <div className="msg_messagesDetail-messageContent">

        <div className="msg_messagesDetail-headerWrapper">

          <div className="msg_messagesDetail-iconWrapper">
            <i className="cl-icon cl-icon--xlarge cl-icon-message-cross"/>
          </div>

          <div className="msg_messagesDetail-headercContentWrapper">
            <strong>{p.t('rescheduleRequestDeclined')}</strong>
          </div>

        </div>

        <div className="msg_messagesDetail-messageSimple">

          <p>{p.t('hiWithName', {name})}</p>

          <p>{p.t('msgDetail', {coachName: coach.name})}</p>

        </div>

        <BookingInfo session={newSession}/>

        <div className="msg_messagesDetail-bookingOriginal">
          <span className="msg_bookingOriginal-title"><strong>{p.t('yourOriginalBookingFor')}</strong></span>
          <span className="msg_bookingOriginal-schedule">{sessionStartDateTime} - {sessionEndTime}</span>
          <span className="msg_bookingOriginal-location">{address}</span>
        </div>

        <div className="msg_messagesDetail-separator"/>

        <MessageFindDifferentSSPBlock/>

        <SeeRecommendation sports={sportName} location={location}/>

      </div>
    );
  }
}
MessageRescheduleRequestDeclined.defaultProps = {

};

MessageRescheduleRequestDeclined.propTypes = {
  message: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};
export default translate('MessageRescheduleRequestDeclined')(MessageRescheduleRequestDeclined);

