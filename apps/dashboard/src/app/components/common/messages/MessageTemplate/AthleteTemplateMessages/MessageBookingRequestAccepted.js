import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import pathToRegExp from 'path-to-regexp';
import {withRouter} from 'react-router-dom';

import BookingInfo from './BookingInfo';
import InviteFriend from './InviteFriend';

import {DASHBOARD_ATHLETE_SCHEDULER_UNSCHEDULED_ORDER_ITEM_ID} from '../../../../../constants/pathConstants';
import MessagePaymentInfoBlock from './MessagePaymentInfoBlock';
import {downloadFileWithAuth} from '../../../../../utils/downloadFile';
class MessageBookingRequestAccepted extends PureComponent {
  constructor(props) {
    super(props);
    this.renderRemainingSession = this.renderRemainingSession.bind(this);
    this.handleSchedule = this.handleSchedule.bind(this);
    this.handleDownloadInvoice = this.handleDownloadInvoice.bind(this);
  }
  handleSchedule(event) {
    const {selectedProfile} = this.props;
    const selectedProfileType = selectedProfile.type;
    const orderItemId = event.currentTarget.getAttribute('value');
    if (orderItemId) {
      const toPath = pathToRegExp.compile(DASHBOARD_ATHLETE_SCHEDULER_UNSCHEDULED_ORDER_ITEM_ID);
      const path = toPath({orderItemId, profileType: selectedProfileType});
      this.props.history.push(path);
    }
  }
  handleDownloadInvoice() {
    const {message, p} = this.props;
    const {body} = message;
    const {order} = body;
    const fileName = p.t('OrderConfirmation.coachlist') + order.id + '.pdf';
    downloadFileWithAuth(order.receiptLink, fileName);
  }

  renderRemainingSession(sessionRemaining) {
    const {p} = this.props;
    if (sessionRemaining.length > 0) {
      return (
        <div>
          <div className="msg_messagesDetail-messageSimple">
            <h4>{p.t('scheduleRemainingSessions')}</h4>
            <p>{p.t('DontForgetToScheduleYour', {numberSession: sessionRemaining.length})}</p>
          </div>

          <div className="msg_messagesDetail-remainingSession">
            {

              sessionRemaining.map(session =>
                (
                  <div key={session.id} className="msg_remainingSession-item">
                    <span>{p.t('sessionRemainingDetails', {skill: session.skill, sport: session.sport, ageGroup: session.ageGroup, currentSession: session.currentSession, totalSession: session.totalSession})}
                    </span><span><a onClick={this.handleSchedule} value={session.orderItemId} >{p.t('ScheduleNow')}</a></span>
                  </div>)
              )
            }
          </div>
        </div>);
    }
  }
  render() {
    const {p, message, name} = this.props;
    const {body} = message;
    const {session, paymentInfo, sessionRemaining, sessionTips} = body;
    const {coach} = session;
    return (
      <div className="msg_messagesDetail-messageContent">

        <div className="msg_messagesDetail-headerWrapper">

          <div className="msg_messagesDetail-iconWrapper">
            <i className="cl-icon cl-icon--xlarge cl-icon-message-tick"/>
          </div>

          <div className="msg_messagesDetail-headercContentWrapper">
            <strong>{p.t('bookingAccepted')}</strong>
          </div>

        </div>

        <div className="msg_messagesDetail-messageSimple">

          <p>{p.t('hiWithName', {name})}</p>

          <p>{p.t('msgDetail', {coachName: coach.name})}</p>

        </div>.
        <BookingInfo session={session}/>

        {/* <div className="msg_messagesDetail-separator"/>

        <div className="msg_messagesDetail-messageSimple">
          <h4>{p.t('tipsToMakeYourSessionAwesome')}</h4>
          <ul>
            {
              sessionTips.map(tips => <li key={tips}>{tips}</li>)
            }
          </ul>
        </div> */}

        <div className="msg_messagesDetail-separator"/>

        <div className="msg_messagesDetail-messageSimple">
          {
            this.renderRemainingSession(sessionRemaining)
          }
          <div className="msg_messagesDetail-separator"/>

          <div className="msg_messagesDetail-messageSimple">
            <h4>{p.t('paymentDetails')}</h4>
            <p><a onClick={this.handleDownloadInvoice}>{p.t('viewReceipt')}</a></p>
          </div>

          <MessagePaymentInfoBlock paymentInfo={paymentInfo}/>

        </div>
      </div>
    );
  }
}
MessageBookingRequestAccepted.defaultProps = {

};

MessageBookingRequestAccepted.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  selectedProfile: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};
export default withRouter(translate('MessageBookingRequestAccepted')(MessageBookingRequestAccepted));

