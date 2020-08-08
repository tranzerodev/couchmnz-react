import React, {Component} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';

import BookingInfo from './BookingInfo';
import MessageFindDifferentSSPBlock from './MessageFindDifferentSSPBlock';
import SeeRecommendation from './SeeRecommendation';

class MessageBookingDeclinedSchedule extends Component {
  render() {
    const {p, name, message} = this.props;
    const {session, sportName, location} = message.body;
    const {coach} = session;
    return (
      <div className="msg_messagesDetail-messageContent">

        <div className="msg_messagesDetail-headerWrapper">

          <div className="msg_messagesDetail-iconWrapper">
            <i className="cl-icon cl-icon--xlarge cl-icon-message-cross"/>
          </div>

          <div className="msg_messagesDetail-headercContentWrapper">
            <strong>{p.t('bookingDeclined')}</strong>
          </div>

        </div>

        <div className="msg_messagesDetail-messageSimple">

          <p>{p.t('hiWithName', {name})}</p>

          <p>{p.t('msgDetail', {coachName: coach.name, sportName, sspType: 'isp'})}</p>

        </div>

        <BookingInfo session={session}/>

        <div className="msg_messagesDetail-separator"/>

        <MessageFindDifferentSSPBlock/>
        <SeeRecommendation sports={sportName} location={location}/>

      </div>
    );
  }
}
MessageBookingDeclinedSchedule.defaultProps = {

};

MessageBookingDeclinedSchedule.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};
export default translate('MessageBookingDeclinedSchedule')(MessageBookingDeclinedSchedule);
