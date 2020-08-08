import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import config from '../../../../config';
import MessageTemplateHeader from './MessageTemplateHeader';
import MessageSSPNoLongerPartOfServices from './AthleteTemplateMessages/MessageSSPNoLongerPartOfServices';
import MessageBookingDeclinedProfile from './AthleteTemplateMessages/MessageBookingDeclinedProfile';
import MessageBookingDeclinedSchedule from './AthleteTemplateMessages/MessageBookingDeclinedSchedule';
import MessageRateSession from './AthleteTemplateMessages/MessageRateSession';
import MessageRefundSuccessful from './AthleteTemplateMessages/MessageRefundSuccessful';
import MessageSessionCompleted from './AthleteTemplateMessages/MessageSessionCompleted';
import MessageRescheduleRequest from './AthleteTemplateMessages/MessageRescheduleRequest';
import MessageBookingPartiallyAccepted from './AthleteTemplateMessages/MessageBookingPartiallyAccepted';
import MessageRescheduleRequestDeclined from './AthleteTemplateMessages/MessageRescheduleRequestDeclined';
import MessageBookingRequestReceived from './AthleteTemplateMessages/MessageBookingRequestReceived';
import MessageBookingRequestAccepted from './AthleteTemplateMessages/MessageBookingRequestAccepted';
import MessageRescheduleSucessfull from './AthleteTemplateMessages/MessageRescheduleSucessfull';
import MessageBookingRequestSent from './AthleteTemplateMessages/MessageBookingRequestSent';
import MessageSessionBookingRequestAccepted from './AthleteTemplateMessages/MessageSessionBookingRequestAccepted';
import MessageSessionChangeRequest from './AthleteTemplateMessages/MessageSessionChangeRequest';
import MessageSessionCancel from './AthleteTemplateMessages/MessageSessionCancel';
import MessageRescheduleRequestConfirm from './AthleteTemplateMessages/MessageRescheduleRequestConfirm';
import MessageRescheduleDeclineProposeNewTime from './AthleteTemplateMessages/MessageRescheduleDeclineProposeNewTime';
import MessageSessionComplete from './AthleteTemplateMessages/MessageSessionComplete';
import MessageRequestRateService from './AthleteTemplateMessages/MessageRequestRateService';

import MessageSessionScheduleRequest from './SSPTemplateMessages/MessageSessionScheduleRequest';
import MessageSessionRescheduleRequest from './SSPTemplateMessages/MessageSessionRescheduleRequest';
import MessageUpcomingSessionNotMetMinRequiredParticipants from './SSPTemplateMessages/MessageUpcomingSessionNotMetMinRequiredParticipants';
import MessageSessionBookingRequestReminder from './SSPTemplateMessages/MessageSessionBookingRequestReminder';
import MessageSessionBookingReminder from './SSPTemplateMessages/MessageSessionBookingReminder';
import MessageRequestRatingService from './SSPTemplateMessages/MessageRequestRatingService';
import MessageSessionCancelled from './SSPTemplateMessages/MessageSessionCancelled';
import MessageFundTransferBank from './SSPTemplateMessages/MessageFundTransferBank';
import MessageRequestReceivedFundWithdraw from './SSPTemplateMessages/MessageRequestReceivedFundWithdraw';
import MessageBookingAccepted from './SSPTemplateMessages/MessageBookingAccepted';
import MessageRescheduleRequested from './SSPTemplateMessages/MessageRescheduleRequested';
import MessageSessionCancelledSSP from './SSPTemplateMessages/MessageSessionCancelledSSP';
import MessageAthleteRescheduleRequestSent from './AthleteTemplateMessages/MessageAthleteRescheduleRequestSent';
import MessageSessionCancelledAthlete from './AthleteTemplateMessages/MessageSessionCancelledAthlete';
import MessageBookingReminderAthlete from './SSPTemplateMessages/MessageBookingReminderAthlete';
import MessageRescheduleConfirmedSSP from './SSPTemplateMessages/MessageRescheduleConfirmedSSP';

const {MESSAGE_TYPE} = config.messagingSystem;

class MessageTemplate extends Component {
  constructor(props) {
    super(props);
    this.handleOnReplyMessage = this.handleOnReplyMessage.bind(this);
    this.handleOnForwardMessage = this.handleOnForwardMessage.bind(this);
    this.renderMessageTemplateFirst = this.renderMessageTemplateFirst.bind(this);
    this.renderMessageTemplateSecond = this.renderMessageTemplateSecond.bind(this);
    this.renderMessageTemplateThird = this.renderMessageTemplateThird.bind(this);

    this.handleActions = this.handleActions.bind(this);
    this.handleApplyAcceptDeclineAction = this.handleApplyAcceptDeclineAction.bind(this);
    this.renderMessageTemplateThird = this.renderMessageTemplateThird.bind(this);
  }

  handleOnReplyMessage() {
    const {message, onReply} = this.props;
    onReply(message);
  }

  handleOnForwardMessage() {
    const {message, onForward} = this.props;
    onForward(message);
  }

  handleActions(event) {
    const {action} = event.currentTarget.dataset;
    const {message} = this.props;
    const {booking} = message.body;
    if (booking) {
      this.props.onBookingAction(booking, action);
    }
  }

  handleApplyAcceptDeclineAction(action, accepted, declined) {
    const {message} = this.props;
    const {booking} = message.body;
    if (booking) {
      this.props.onBookingAction({id: booking.id, accepted, declined}, action);
    }
  }

  renderMessageTemplateFirst() {
    const {message, userName, profile} = this.props;
    const {type} = message;
    switch (type) {
      case MESSAGE_TYPE.SSP_OUT_OF_COACHLIST: {
        return (<MessageSSPNoLongerPartOfServices name={userName} message={message}/>);
      }
      case MESSAGE_TYPE.BOOKING_DECLINED_PROFILE: {
        return (<MessageBookingDeclinedProfile name={userName} message={message}/>);
      }
      case MESSAGE_TYPE.BOOKING_DECLINED_SCHEDULE: {
        return (<MessageBookingDeclinedSchedule name={userName} message={message}/>);
      }
      case MESSAGE_TYPE.RATE_SESSION: {
        return (<MessageRateSession message={message}/>);
      }
      case MESSAGE_TYPE.REFUND_SUCCESSFUL: {
        return (<MessageRefundSuccessful name={userName} message={message}/>);
      }

      case MESSAGE_TYPE.SESSION_COMPLETED: {
        return (<MessageSessionCompleted name={userName} message={message}/>);
      }
      case MESSAGE_TYPE.RESCHEDULE_REQUEST: {
        return (<MessageRescheduleRequest message={message} selectedProfile={profile} onAction={this.handleActions}/>);
      }
      case MESSAGE_TYPE.BOOKING_PARTIALLY_ACCEPTED: {
        return (<MessageBookingPartiallyAccepted name={userName} message={message}/>);
      }
      case MESSAGE_TYPE.RESCHEDULE_REQUEST_DECLINED: {
        return (<MessageRescheduleRequestDeclined name={userName} message={message}/>);
      }
      case MESSAGE_TYPE.BOOKING_REQUEST_RECEIVED: {
        return (<MessageBookingRequestReceived name={userName} selectedProfile={profile} message={message}/>);
      }
      case MESSAGE_TYPE.BOOKING_REQUEST_ACCEPTED: {
        return (<MessageBookingRequestAccepted name={userName} message={message} selectedProfile={profile}/>);
      }
      case MESSAGE_TYPE.RESCHDULE_SUCESSFULL: {
        return (<MessageRescheduleSucessfull name={userName} message={message}/>);
      }
      case MESSAGE_TYPE.SESSION_SCHEDULE_REQUEST: {
        return (<MessageSessionScheduleRequest onAction={this.handleActions} onApplyAcceptDecline={this.handleApplyAcceptDeclineAction} userName={userName} message={message}/>);
      }
      case MESSAGE_TYPE.SESSION_RESCHEDULE_REQUEST: {
        return (<MessageSessionRescheduleRequest message={message} onAction={this.handleActions}/>);
      }
      case MESSAGE_TYPE.UPCOMING_SESSION_NOT_MET_REQUIRED_PARTICIPANTS: {
        return (<MessageUpcomingSessionNotMetMinRequiredParticipants name={userName} message={message}/>);
      }
      default: {
        return null;
      }
    }
  }
  renderMessageTemplateSecond() {
    const {message, userName, profile} = this.props;
    const {type} = message;
    switch (type) {
      case MESSAGE_TYPE.SSP_SESSION_BOOKING_REQUEST_REMINDER: {
        return (<MessageSessionBookingRequestReminder onAction={this.handleActions} name={userName} message={message}/>);
      }
      case MESSAGE_TYPE.SSP_SESSION_BOOKING_REMINDER: {
        return (<MessageSessionBookingReminder name={userName} message={message}/>);
      }
      case MESSAGE_TYPE.SSP_REQUEST_RATING_SERVICE: {
        return (<MessageRequestRatingService name={userName}/>);
      }
      case MESSAGE_TYPE.SSP_SESSION_CANCELLED: {
        return (<MessageSessionCancelled name={userName} message={message}/>);
      }
      case MESSAGE_TYPE.SSP_FUND_TRANSFER_BANK: {
        return (<MessageFundTransferBank name={userName}/>);
      }
      case MESSAGE_TYPE.SSP_FUND_WITHDRAW_REQUEST: {
        return (<MessageRequestReceivedFundWithdraw name={userName}/>);
      }
      case MESSAGE_TYPE.MESSAGE_BOOKING_REQUEST_SENT: {
        return (<MessageBookingRequestSent name={userName} selectedProfile={profile} message={message}/>);
      }
      case MESSAGE_TYPE.MESSAGE_SESSION_BOOKING_REQUEST_SENT_ACCEPTED: {
        return (<MessageSessionBookingRequestAccepted selectedProfile={profile} name={userName} message={message}/>);
      }
      case MESSAGE_TYPE.MESSAGE_SESSION_CHANGE_REQUEST: {
        return (<MessageSessionChangeRequest selectedProfile={profile} name={userName} message={message}/>);
      }
      case MESSAGE_TYPE.MESSAGE_SESSION_CANCEL: {
        return (<MessageSessionCancel name={userName} message={message}/>);
      }
      case MESSAGE_TYPE.MESSAGE_SESSION_RESCHEDULE_REQUEST_CONFIRM: {
        return (<MessageRescheduleRequestConfirm selectedProfile={profile} name={userName} message={message}/>);
      }
      case MESSAGE_TYPE.MESSAGE_SESSION_RESCHEDULE_DECLINE_PROPOSE_NEW_TIME: {
        return (<MessageRescheduleDeclineProposeNewTime onAction={this.handleActions} selectedProfile={profile} name={userName} message={message}/>);
      }
      case MESSAGE_TYPE.MESSAGE_SESSION_COMPLETE: {
        return (<MessageSessionComplete selectedProfile={profile} name={userName} message={message}/>);
      }
      case MESSAGE_TYPE.MESSAGE_RATE_SERVICE: {
        return (<MessageRequestRateService name={userName} message={message}/>);
      }
      default: {
        return null;
      }
    }
  }

  renderMessageTemplateThird() {
    const {message, userName, profile} = this.props;
    // Console.log('Mesage :: ', message);
    const {type} = message;
    switch (type) {
      case MESSAGE_TYPE.SSP_BOOKING_ACCEPTED: {
        return (<MessageBookingAccepted name={userName} message={message}/>);
      }
      case MESSAGE_TYPE.SSP_RESCHEDULE_CONFIRMED_SSP: {
        return (<MessageRescheduleConfirmedSSP name={userName} message={message}/>);
      }
      case MESSAGE_TYPE.SSP_RESCHEDULE_REQUEST_SENT: {
        return (<MessageRescheduleRequested name={userName} message={message}/>);
      }
      case MESSAGE_TYPE.SSP_CANCELLED_SESSION_SSP: {
        return (<MessageSessionCancelledSSP name={userName} message={message}/>);
      }
      case MESSAGE_TYPE.ATHLETE_RESCHEDULE_REQUEST_SENT: {
        return (<MessageAthleteRescheduleRequestSent name={userName} message={message}/>);
      }
      case MESSAGE_TYPE.ATHLETE_CANCELLED_SESSION_ATHLETE: {
        return (<MessageSessionCancelledAthlete name={userName} message={message}/>);
      }
      case MESSAGE_TYPE.ATHLETE_SESSION_BOOKING_REMINDER: {
        return (<MessageBookingReminderAthlete name={userName} message={message}/>);
      }
      default: {
        return null;
      }
    }
  }
  render() {
    const {message} = this.props;

    return (
      <div className="msg_messagesDetail-container">
        <MessageTemplateHeader message={message}/>
        {
          this.renderMessageTemplateFirst()
        }
        {
          this.renderMessageTemplateSecond()
        }
        {
          this.renderMessageTemplateThird()
        }
      </div>
    );
  }
}

MessageTemplate.propTypes = {
  message: PropTypes.object.isRequired,
  onReply: PropTypes.func.isRequired,
  onForward: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  onBookingAction: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const {profile} = state.messages;
  const currentProfile = (state.profile.data.profile) ? state.profile.data.profile : state.profile.data;
  const {firstName, lastName} = currentProfile;
  const userName = `${firstName} ${lastName}`;
  return {
    userName,
    profile
  };
};

export default connect(mapStateToProps)(MessageTemplate);
