import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';

import MessageTemplateSignatureFooter from '../MessageTemplateSignatureFooter';
import MessageSessionDetails from '../MessageSessionDetails';

class MessageSessionCancelled extends PureComponent {
  render() {
    const {p, name, message} = this.props;
    const {body} = message;
    const {session} = body;
    return (
      <div className="msg_messagesDetail-messageContent">

        <div className="msg_messagesDetail-messageSimple msg_messagesDetail-messageSimpleSec">

          <p>{p.t('dearWithName', {name})}</p>
          <p>{p.t('athleteHasCancelledSession', {athleteName: session.athleteName})}</p>
          <div className="msg-content-border"/>
          <MessageSessionDetails session={session}/>

          <p>{p.t('ifCanceledAllottedTime')}</p>
          <p>{p.t('ifCanceledDesignatedTime')}</p>
          <p>{p.t('youCanViewSessionDetailsDashboard')}</p>
          <p>{p.t('ifYouHaveAnyQuestions')}</p>
          <MessageTemplateSignatureFooter/>

        </div>

      </div>
    );
  }
}
MessageSessionCancelled.defaultProps = {

};

MessageSessionCancelled.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};
export default translate('MessageSessionCancelled')(MessageSessionCancelled);

