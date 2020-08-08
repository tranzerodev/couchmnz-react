import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';

import MessagePaymentInfoBlock from './MessagePaymentInfoBlock';
import config from '../../../../../config';
import {parseUrlTemplate} from '../../../../../utils/urlHelper';
import {getFormattedTrainingDateTime} from '../../../../ssp/isp/dashboard/SessionTimeLines/ispSessionTemplates';

class MessageSessionCompleted extends PureComponent {
  render() {
    const {p, message, name} = this.props;
    const {session, totalSession, paymentInfo} = message.body;
    const {coach, athleteName, startDate, endDate} = session;
    const coachUrl = parseUrlTemplate(config.sspDeatilsPage, {nickname: coach.nickname});
    return (
      <div className="msg_messagesDetail-messageContent">

        <div className="msg_messagesDetail-headerWrapper">

          <div className="msg_messagesDetail-iconWrapper">
            <i className="cl-icon cl-icon--xlarge cl-icon-message-tick"/>
          </div>

          <div className="msg_messagesDetail-headercContentWrapper">
            <strong>{p.t('MessageSessionCompleted.sessionCompleted')}</strong>
          </div>

        </div>

        <div className="msg_messagesDetail-messageSimple">

          <p>{p.t('MessageSessionCompleted.hiWithName', {name})}</p>

          <p>{p.t('MessageSessionCompleted.detailedMsg', {coachName: coach.name, sessionName: session.name})}</p>

        </div>

        <div className="msg_messagesDetail-bookingInfo uk-clearfix">

          <div className="msg_messagesDetail-profilePic">
            <img src={coach.profilePic} alt={coach.name}/>
          </div>

          <div className="msg_messagesDetail-bookingDetails">
            <div className="msg_messagesDetail-bookingStatus">
              {p.t('MessageSessionCompleted.complete')}
            </div>
            <div className="msg_messagesDetail-bookingTitle">
              {p.t('MessageSessionCompleted.sessionNameWith', {sessionName: session.name})} <a href={coachUrl} target="_blank">{coach.name}</a>
              <span>{p.t('MessageSessionCompleted.athleteWithName', {athleteName})}</span>
              <span>{getFormattedTrainingDateTime(p.t, startDate, endDate)}</span>
            </div>
            <div className="msg_messagesDetail-bookingSchedule">
              {p.t('MessageSessionCompleted.sessionsWithCount', {totalSession})}
            </div>
          </div>

        </div>

        <div className="msg_messagesDetail-separator"/>

        <div className="msg_messagesDetail-messageSimple">
          <h4>{p.t('MessageSessionCompleted.paymentDetails')}</h4>
        </div>

        <MessagePaymentInfoBlock paymentInfo={paymentInfo}/>

      </div>
    );
  }
}
MessageSessionCompleted.defaultProps = {

};

MessageSessionCompleted.propTypes = {
  message: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};
export default translate(MessageSessionCompleted);

