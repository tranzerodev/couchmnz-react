import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';

import MessagePaymentInfoBlock from './MessagePaymentInfoBlock';
import config from '../../../../../config';
import {parseUrlTemplate} from '../../../../../utils/urlHelper';

class MessageRefundSuccessful extends PureComponent {
  render() {
    const {p, message, name} = this.props;
    const {session, totalSession, refundedSession, paymentInfo} = message.body;
    const {coach, athleteName} = session;
    const coachUrl = parseUrlTemplate(config.sspDeatilsPage, {nickname: coach.nickname});

    return (
      <div className="msg_messagesDetail-messageContent">

        <div className="msg_messagesDetail-headerWrapper">

          <div className="msg_messagesDetail-headercContentWrapper">
            <strong>{p.t('refundSuccessful')}</strong>
          </div>

        </div>

        <div className="msg_messagesDetail-messageSimple">

          <p>{p.t('hiWithName', {name})}</p>

          <p>{p.t('refundMsg', {refundedSession})}</p>

        </div>

        <div className="msg_messagesDetail-bookingInfo uk-clearfix">

          <div className="msg_messagesDetail-profilePic">
            <img src={coach.profilePic} alt={coach.name}/>
          </div>

          <div className="msg_messagesDetail-bookingDetails">
            <div className="msg_messagesDetail-bookingTitle">
              {p.t('sessionNameWith', {sessionName: session.name})}<a href={coachUrl} target="_blank">{coach.name}</a>
              <span>{p.t('athleteWithName', {athleteName})}</span>
            </div>
            <div className="msg_messagesDetail-bookingSchedule">
              {p.t('sessionsWithCount', {totalSession})}
            </div>
          </div>

        </div>

        <div className="msg_messagesDetail-separator"/>

        <div className="msg_messagesDetail-messageSimple">
          <h4>{p.t('refundDetails')}</h4>
        </div>

        <MessagePaymentInfoBlock paymentInfo={paymentInfo}/>

      </div>
    );
  }
}
MessageRefundSuccessful.defaultProps = {

};

MessageRefundSuccessful.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};
export default translate('MessageRefundSuccessful')(MessageRefundSuccessful);

