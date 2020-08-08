import React, {Component} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import moment from 'moment';

import config from '../../../../../config';
import {parseUrlTemplate} from '../../../../../utils/urlHelper';

const {sessionBookingStatus} = config;
class BookingInfo extends Component {
  constructor(props) {
    super(props);
    this.getBookingStatusText = this.getBookingStatusText.bind(this);
    this.renderFindAnotherTimeWithCoach = this.renderFindAnotherTimeWithCoach.bind(this);
    this.renderSessionAddress = this.renderSessionAddress.bind(this);
  }
  getBookingStatusText(bookingStatus) {
    const {p} = this.props;
    switch (bookingStatus) {
      case sessionBookingStatus.BOOKING_ACCEPTED: return p.t('bookingAccepted');
      case sessionBookingStatus.BOOKING_DECLINED: return p.t('bookingDeclined');
      case sessionBookingStatus.BOOKING_RQUESTED: return p.t('bookingRequested');
      case sessionBookingStatus.RESCHEDULE_ACCEPTED: return p.t('rescheduleAccepted');
      case sessionBookingStatus.RESCHEDULE_DECLINED: return p.t('rescheduleDeclined');
      case sessionBookingStatus.RESCHEDULE_REQUESTED: return p.t('rescheduleRequested');
      default : return null;
    }
  }

  renderFindAnotherTimeWithCoach(bookingStatus, coachName, coachNickName) {
    const {p} = this.props;
    const coachUrl = parseUrlTemplate(config.sspDeatilsPage, {nickname: coachNickName});
    if (bookingStatus === sessionBookingStatus.BOOKING_DECLINED) {
      return (
        <div className="msg_messagesDetail-bookingCta">
          <a href={coachUrl} target="_blank">{p.t('findAnotherTimeWithCoach', {coachName})}</a>
        </div>
      );
    }
    return null;
  }

  renderSessionAddress() {
    const {address} = this.props.session;
    if (address) {
      return (
        <div className="msg_messagesDetail-bookingLocation">
          <i className="cl-icon cl-icon--tiny cl-icon-location-pin"/> <span>{address}</span>
        </div>
      );
    }
    return null;
  }

  render() {
    const {p, session, isScheduled} = this.props;
    const {bookingStatus, athleteName, name, coach, startDate, endDate} = session;
    const sessionStartDateTime = (moment(startDate)).format(p.t('sesionStartDateTimeFormat'));
    const sessionEndTime = (moment(endDate)).format(p.t('sesionEndTimeFormat'));
    const coachUrl = parseUrlTemplate(config.sspDeatilsPage, {nickname: coach.nickname});

    return (
      <div className="msg_messagesDetail-bookingInfo uk-clearfix">

        <div className="msg_messagesDetail-profilePic">
          <img src={coach.profilePic} alt={coach.name}/>
        </div>

        <div className="msg_messagesDetail-bookingDetails">
          <div className="msg_messagesDetail-bookingStatus">
            {
              this.getBookingStatusText(bookingStatus)
            }
          </div>
          <div className="msg_messagesDetail-bookingTitle">
            {p.t('sessionNameWith', {sessionName: name})} <a href={coachUrl} target="_blank">{coach.name}</a>
            <span>{p.t('athlete')} {athleteName}</span>
          </div>
          {isScheduled ?
            <div className="msg_messagesDetail-bookingSchedule">
              <i className="cl-icon cl-icon-calendar"/> <span>{sessionStartDateTime} - {sessionEndTime}</span>
            </div> :
            <div className="msg_messagesDetail-bookingSchedule">
              <span>{p.t('unscheduled')}</span>
            </div>
          }
          {
            this.renderFindAnotherTimeWithCoach(bookingStatus, coach.name, coach.nickname)
          }
          {
            this.renderSessionAddress()
          }

        </div>

      </div>
    );
  }
}
BookingInfo.defaultProps = {
  isScheduled: true
};

BookingInfo.propTypes = {
  session: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  isScheduled: PropTypes.bool
};
export default translate('BookingInfo')(BookingInfo);
