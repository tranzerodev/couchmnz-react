import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import pathToRegExp from 'path-to-regexp';
import {withRouter} from 'react-router';

import BookingInfo from './BookingInfo';
import InviteFriend from './InviteFriend';
import MessagePaymentInfoBlock from './MessagePaymentInfoBlock';
import {downloadFileWithAuth} from '../../../../../utils/downloadFile';
import {DASHBOARD_ATHLETE_SCHEDULER_UNSCHEDULED_ORDER_ITEM_ID} from '../../../../../constants/pathConstants';

class MessageBookingRequestReceived extends PureComponent {
  constructor(props) {
    super(props);
    this.renderRemainingSession = this.renderRemainingSession.bind(this);
    this.handleDownloadInvoice = this.handleDownloadInvoice.bind(this);
    this.handleScheduleNow = this.handleScheduleNow.bind(this);
  }

  handleDownloadInvoice() {
    const {p, message} = this.props;
    const {body} = message;
    const {order} = body;
    const fileName = p.t('coachlist') + order.id + '.pdf';
    downloadFileWithAuth(order.receiptLink, fileName);
  }

  handleScheduleNow(e) {
    const orderItemId = e.currentTarget.getAttribute('data-id');
    const {selectedProfile} = this.props;

    const toPath = pathToRegExp.compile(DASHBOARD_ATHLETE_SCHEDULER_UNSCHEDULED_ORDER_ITEM_ID);
    const path = toPath({orderItemId, profileType: selectedProfile.type});
    this.props.history.push(path);
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
                    <span>{p.t('sessionRemainingDetails', {skill: session.skill, sport: session.sport, ageGroup: session.ageGroup, currentSession: session.openPosition, totalSession: session.totalSession})}
                    </span><span><a data-id={session.orderItemId} onClick={this.handleScheduleNow}>{p.t('ScheduleNow')}</a></span>
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
    const {session, paymentInfo, sessionRemaining} = body;
    const {coach} = session;
    return (
      <div className="msg_messagesDetail-messageContent">

        <div className="msg_messagesDetail-headerWrapper">

          <div className="msg_messagesDetail-iconWrapper">
            <i className="cl-icon cl-icon--xlarge cl-icon-mail-open"/>
          </div>

          <div className="msg_messagesDetail-headercContentWrapper">
            <strong>{p.t('weReceiveyourBookingRequest')}</strong>
          </div>

        </div>

        <div className="msg_messagesDetail-messageSimple">

          <p>{p.t('hiWithName', {name})}</p>

          <p>{p.t('msgDetail', {coachName: coach.name})}</p>

        </div>
        <BookingInfo session={session}/>

        <div className="msg_messagesDetail-separator"/>
        {this.renderRemainingSession(sessionRemaining)}
        <div className="msg_messagesDetail-separator"/>

        <div className="msg_messagesDetail-messageSimple">
          <h4>{p.t('paymentDetails')}</h4>
          <p><a onClick={this.handleDownloadInvoice}>{p.t('viewReceipt')}</a></p>
        </div>
        <MessagePaymentInfoBlock paymentInfo={paymentInfo}/>
      </div>

    );
  }
}
MessageBookingRequestReceived.defaultProps = {

};

MessageBookingRequestReceived.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  selectedProfile: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
export default withRouter(translate('MessageBookingRequestReceived')(MessageBookingRequestReceived));

