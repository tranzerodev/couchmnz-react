
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import {Link} from 'react-router-dom';

import MessageTemplateSignatureFooter from '../MessageTemplateSignatureFooter';
import MessageSessionDetails from '../MessageSessionDetails';
import {DASHBOARD_MANAGE_BOOKING} from '../../../../../constants/pathConstants';

class MessageBookingAccepted extends PureComponent {
  render() {
    const {p, message, name} = this.props;
    const {body} = message;
    const {session} = body;
    return (
      <div className="msg_messagesDetail-messageContent">
        <div className="msg_messagesDetail-messageSimple msg_messagesDetail-messageSimpleSec">
          <p>{p.t('dearWithName', {name})}</p>
          <p>{p.t('BookingRequestAcceptedConfirmed')}</p>
          <div className="msg-content-border"/>
          <MessageSessionDetails session={session}/>
          <p>{p.t('youCanViewSessionDetails')} <Link to={DASHBOARD_MANAGE_BOOKING}> {p.t('here')}</Link>.</p>
          <p>{p.t('ifYouHaveAnyQuestions')}</p>
          <MessageTemplateSignatureFooter/>
        </div>
      </div>
    );
  }
}

MessageBookingAccepted.defaultProps = {

};

MessageBookingAccepted.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};
export default translate('MessageSessionBookingRequestAcceptedSSP')(MessageBookingAccepted);

