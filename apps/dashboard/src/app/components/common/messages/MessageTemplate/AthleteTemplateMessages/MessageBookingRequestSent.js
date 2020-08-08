
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import {Link} from 'react-router-dom';

import MessageTemplateSignatureFooter from '../MessageTemplateSignatureFooter';
import MessageSessionDetails from '../MessageSessionDetails';
import {getUrlWithProfileType} from '../../../../../utils/path';
import {DASHBOARD_ATHLETE_SCHEDULER_CHANGES} from '../../../../../constants/pathConstants';

class MessageBookingRequestSent extends PureComponent {
  render() {
    const {p, message, name, selectedProfile} = this.props;
    const {body} = message;
    const {session} = body;
    const path = getUrlWithProfileType(DASHBOARD_ATHLETE_SCHEDULER_CHANGES, selectedProfile.type);
    return (

      <div className="msg_messagesDetail-messageContent">
        <div className="msg_messagesDetail-messageSimple msg_messagesDetail-messageSimpleSec">
          <p>{p.t('dearWithName', {name})}</p>
          <p>{p.t('youSentBookingRequest')} </p>
          <div className="msg-content-border"/>
          <MessageSessionDetails session={session}/>
          <p>{p.t('pendingRequest')}<Link to={path}>{p.t('here')}</Link>.</p>
          <p>{p.t('messageDetails')}</p>
          <p>{p.t('ifYouHaveAnyQuestions')}</p>
          <MessageTemplateSignatureFooter/>

        </div>

      </div>
    );
  }
}
MessageBookingRequestSent.defaultProps = {

};

MessageBookingRequestSent.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  selectedProfile: PropTypes.object.isRequired
};
export default translate('MessageBookingRequestSent')(MessageBookingRequestSent);

