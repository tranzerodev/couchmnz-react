import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import moment from 'moment';

import MessageTemplateSignatureFooter from '../MessageTemplateSignatureFooter';

class MessageSessionCancel extends PureComponent {
  render() {
    const {p, name, message} = this.props;
    const {body} = message;
    const {session, SSPName} = body;
    const {sessionDateTime} = session;
    const dateTime = (sessionDateTime) ? (moment(sessionDateTime)).format(p.t('sesionDateTimeFormat')) : undefined;
    return (

      <div className="msg_messagesDetail-messageContent">

        <div className="msg_messagesDetail-messageSimple msg_messagesDetail-messageSimpleSec">

          <p>{p.t('dearWithName', {name})}</p>
          <p>{p.t('sessionCancelDetails', {SSPName, dateTime, ...session})}</p>
          <div className="msg-content-border"/>
          <p>{p.t('youReceivedCreditCoachlistAccount')}</p>
          <p>
            {p.t('ifYouWouldLike')}
            <a href="#">{p.t('login')}</a>{p.t('goToYou')}<a href="#">{p.t('dashboard')}</a> {p.t('requestPayment')}
          </p>
          <p>{p.t('weSincerelyApologize')}</p>
          <p>{p.t('weHopeAnotherSession')}</p>
          <p>{p.t('ifYouHaveAnyQuestions')}</p>
          <MessageTemplateSignatureFooter/>

        </div>

      </div>
    );
  }
}
MessageSessionCancel.defaultProps = {

};

MessageSessionCancel.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};
export default translate('MessageSessionCancel')(MessageSessionCancel);

