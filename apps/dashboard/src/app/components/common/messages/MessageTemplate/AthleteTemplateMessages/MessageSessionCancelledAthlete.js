import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import moment from 'moment';

import MessageTemplateSignatureFooter from '../MessageTemplateSignatureFooter';

class MessageSessionCancelledAthlete extends PureComponent {
  render() {
    const {p, name, message} = this.props;
    const {body} = message;
    const {session, reason} = body;
    const SSPName = body.coachName;
    const {startDate} = session;
    const dateTime = (startDate) ? (moment(startDate)).format(p.t('sesionDateTimeFormat')) : undefined;
    return (

      <div className="msg_messagesDetail-messageContent">

        <div className="msg_messagesDetail-messageSimple msg_messagesDetail-messageSimpleSec">

          <p>{p.t('dearWithName', {name})}</p>
          <p>{p.t(reason ? 'sessionCancelDetails' : 'sessionCancel', {SSPName, dateTime, sport: body.sportName, ...session})}</p>
          <div className="msg-content-border"/>
          {/* <p>{p.t('youReceivedCreditCoachlistAccount')}</p>
          <p>
            {p.t('ifYouWouldLike')}
            <a href="#">{p.t('login')}</a>{p.t('goToYou')}<a href="#">{p.t('dashboard')}</a> {p.t('requestPayment')}
          </p>
          <p>{p.t('weSincerelyApologize')}</p> */}
          <p>{p.t('weHopeAnotherSession')}</p>
          <p>{p.t('ifYouHaveAnyQuestions')}</p>
          <MessageTemplateSignatureFooter/>

        </div>

      </div>
    );
  }
}
MessageSessionCancelledAthlete.defaultProps = {

};

MessageSessionCancelledAthlete.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};
export default translate('MessageSessionCancelledAthlete')(MessageSessionCancelledAthlete);

