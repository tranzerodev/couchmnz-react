import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';

import config from '../../../../../config';
import {parseUrlTemplate} from '../../../../../utils/urlHelper';

class MessageRateSession extends PureComponent {
  render() {
    const {p, message} = this.props;
    const {session, currentSession, totalSession} = message.body;
    const {coach, name, athleteName} = session;
    const coachUrl = parseUrlTemplate(config.sspDeatilsPage, {nickname: coach.nickname});
    return (
      <div className="msg_messagesDetail-messageContent">

        <div className="msg_messagesDetail-headerWrapper">

          <div className="msg_messagesDetail-headercContentWrapper">
            <strong>{p.t('pleaseRateSessionWithCoach', {coachName: coach.name})}</strong>
          </div>

        </div>

        <div className="msg_messagesDetail-bookingInfo uk-clearfix">

          <div className="msg_messagesDetail-profilePic">
            <img src={coach.profilePic} alt={coach.name}/>
          </div>

          <div className="msg_messagesDetail-bookingDetails">
            <div className="msg_messagesDetail-bookingStatus">
              {p.t('bookingStatusComplete')}
            </div>
            <div className="msg_messagesDetail-bookingTitle">
              {p.t('sessionNameWith', {sessionName: name})}<a href={coachUrl} target="_blank">{coach.name}</a>
              <span>{p.t('athleteWithName', {athleteName})}</span>
            </div>
            <div className="msg_messagesDetail-bookingSchedule">
              {p.t('currentSession', {currentSession, totalSession})}
            </div>
          </div>

        </div>

        <div className="msg_messagesDetail-messageBtn">
          <a href="#">{p.t('btnRateNow')}</a>
        </div>
      </div>
    );
  }
}
MessageRateSession.defaultProps = {

};

MessageRateSession.propTypes = {
  message: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};
export default translate('MessageRateSession')(MessageRateSession);

